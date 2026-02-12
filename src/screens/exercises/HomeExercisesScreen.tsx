import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AppNavigation } from '../../navigation/types';

type Props = {
  navigation: AppNavigation;
};

function HomeExercisesScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>TP - Exercices</Text>
        <Text style={styles.subtitle}>Choisissez un exercice à ouvrir</Text>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Exercise1Paper', undefined)}>
          <Text style={styles.buttonText}>Ex 1 - React Native Paper</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Exercise2Api', undefined)}>
          <Text style={styles.buttonText}>Ex 2 - REST API</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Exercise3Sqlite', undefined)}>
          <Text style={styles.buttonText}>Ex 3 - SQLite</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0f172a',
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    color: '#475569',
    marginTop: 8,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#1d4ed8',
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
  },
});

export default HomeExercisesScreen;
