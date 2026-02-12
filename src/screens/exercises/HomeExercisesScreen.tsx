import React, { useMemo, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { AppNavigation } from '../../navigation/types';
import { PaperButton, PaperCard, PaperChip, PaperSwitch } from '../../lib/paperLike';

type Props = {
  navigation: AppNavigation;
};

const EXERCISE_ROUTES = ['Exercise1Paper', 'Exercise2Api', 'Exercise3Sqlite'] as const;

function HomeExercisesScreen({ navigation }: Props) {
  const [focusMode, setFocusMode] = useState(false);
  const [lastLaunched, setLastLaunched] = useState('Aucun');

  const chipText = useMemo(() => (focusMode ? 'Mode focus actif' : 'Mode decouverte actif'), [focusMode]);

  const openRandomExercise = () => {
    const randomRoute = EXERCISE_ROUTES[Math.floor(Math.random() * EXERCISE_ROUTES.length)];
    setLastLaunched(randomRoute);
    navigation.navigate(randomRoute, undefined);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>TP - Exercices</Text>
        <Text style={styles.subtitle}>Choisissez un exercice a ouvrir</Text>

        <PaperCard title="Session du jour">
          <Text style={styles.cardText}>3 modules disponibles</Text>
          <PaperChip text={chipText} />

          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>Navigation rapide</Text>
            <PaperSwitch value={focusMode} onChange={setFocusMode} />
          </View>

          <Text style={styles.smallText}>Dernier lancement surprise: {lastLaunched}</Text>
        </PaperCard>

        <PaperButton label="Ex 1 - React Native Paper" onPress={() => navigation.navigate('Exercise1Paper', undefined)} />
        <PaperButton label="Ex 2 - REST API" onPress={() => navigation.navigate('Exercise2Api', undefined)} />
        <PaperButton label="Ex 3 - SQLite" onPress={() => navigation.navigate('Exercise3Sqlite', undefined)} />
        <PaperButton label="Exercice surprise" onPress={openRandomExercise} />
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
    marginBottom: 12,
  },
  cardText: {
    color: '#334155',
    marginBottom: 4,
  },
  switchRow: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  switchLabel: {
    color: '#0f172a',
    fontWeight: '600',
  },
  smallText: {
    marginTop: 10,
    color: '#475569',
  },
});

export default HomeExercisesScreen;
