const {spawn} = require('node:child_process');

function run(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      stdio: 'pipe',
      shell: process.platform === 'win32',
      ...options,
    });

    let stdout = '';
    let stderr = '';

    child.stdout.on('data', chunk => {
      const text = chunk.toString();
      stdout += text;
      process.stdout.write(text);
    });

    child.stderr.on('data', chunk => {
      const text = chunk.toString();
      stderr += text;
      process.stderr.write(text);
    });

    child.on('error', reject);

    child.on('close', code => {
      if (code === 0) {
        resolve({stdout, stderr});
      } else {
        reject(new Error(`${command} ${args.join(' ')} failed with code ${code}`));
      }
    });
  });
}

async function sleep(ms) {
  await new Promise(resolve => setTimeout(resolve, ms));
}

async function waitForBoot() {
  console.log('⏳ Waiting for Android device...');
  await run('adb', ['wait-for-device']);

  for (let i = 0; i < 90; i += 1) {
    try {
      const {stdout} = await run('adb', ['shell', 'getprop', 'sys.boot_completed']);
      if (stdout.trim() === '1') {
        console.log('✅ Device boot completed.');
        return;
      }
    } catch {
      // ignore temporary adb command failures while emulator is starting
    }

    await sleep(2000);
  }

  throw new Error('Timed out waiting for emulator boot completion (sys.boot_completed != 1).');
}

async function main() {
  try {
    await waitForBoot();
    await run('npx', ['react-native', 'run-android']);
  } catch (error) {
    console.error('❌ Android launch failed:', error.message);
    process.exitCode = 1;
  }
}

main();
