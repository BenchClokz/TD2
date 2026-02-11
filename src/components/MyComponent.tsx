import { Text, TextInput, View, StyleSheet, Image } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginTop: 16,
    borderRadius: 4,
  },
  catImage: {
    width: '100%',
    height: 200,
    marginTop: 16,
    borderRadius: 8,
  },
});

function MyComponent() {
  return (
    <SafeAreaProvider>
          <View style={styles.container}>
            <Text>Hello World !</Text>
            <TextInput placeholder="Enter your name" style={styles.input} />
            <Image
              source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg' }}
              style={styles.catImage}
            />
          </View>
        </SafeAreaProvider>
  );
}

export default MyComponent;