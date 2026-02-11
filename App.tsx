/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { Text, TextInput, View, StyleSheet, Image } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MyComponent from './src/components/MyComponent.tsx';

function App() {
  return (
    <MyComponent />
  );
}

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


export default App;
