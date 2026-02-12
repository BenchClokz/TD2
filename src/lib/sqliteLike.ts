import AsyncStorage from '../storage/asyncStorage';

export type Task = {
  id: number;
  title: string;
};

const DB_KEY = 'sqlite_tasks';

export async function initDb(): Promise<void> {
  const current = await AsyncStorage.getItem(DB_KEY);
  if (!current) {
    await AsyncStorage.setItem(DB_KEY, JSON.stringify([]));
  }
}

export async function selectTasks(): Promise<Task[]> {
  const raw = await AsyncStorage.getItem(DB_KEY);
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw) as Task[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function insertTask(title: string): Promise<void> {
  const tasks = await selectTasks();
  const newTask: Task = {
    id: Date.now(),
    title,
  };

  await AsyncStorage.setItem(DB_KEY, JSON.stringify([newTask, ...tasks]));
}

export async function deleteTask(taskId: number): Promise<void> {
  const tasks = await selectTasks();
  const updated = tasks.filter(task => task.id !== taskId);
  await AsyncStorage.setItem(DB_KEY, JSON.stringify(updated));
}
