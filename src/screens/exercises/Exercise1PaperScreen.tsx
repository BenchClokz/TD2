import React, { useMemo, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { AppNavigation } from '../../navigation/types';
import { PaperButton, PaperCard, PaperChip, PaperSwitch } from '../../lib/paperLike';

type Props = {
  navigation: AppNavigation;
};

function Exercise1PaperScreen({ navigation }: Props) {
  const [name, setName] = useState('');
  const [validatedName, setValidatedName] = useState('');
  const [notifications, setNotifications] = useState(true);
  const [compactView, setCompactView] = useState(false);

  const completion = useMemo(() => {
    let score = 0;
    if (name.trim().length >= 3) {
      score += 1;
    }
    if (validatedName.trim()) {
      score += 1;
    }
    if (notifications) {
      score += 1;
    }
    return `${score}/3 pret`;
  }, [name, notifications, validatedName]);

  const greeting = validatedName
    ? `Bonjour ${validatedName}, bienvenue dans l'application !`
    : 'Aucun nom valide.';

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Ex 1 - React Native Paper</Text>

        <TextInput value={name} onChangeText={setName} style={styles.input} placeholder="Saisir un nom" />

        <PaperButton label="Valider" onPress={() => setValidatedName(name.trim())} />

        <PaperCard title="Message personnalise">
          <Text style={styles.message}>{greeting}</Text>
          <PaperChip text={`Longueur: ${name.trim().length}`} />
          <PaperChip text={`Progression: ${completion}`} />

          <View style={styles.switchRow}>
            <Text>Notifications</Text>
            <PaperSwitch value={notifications} onChange={setNotifications} />
          </View>
        </PaperCard>

        <PaperCard title="Personnalisation UI">
          <View style={[styles.previewBox, compactView ? styles.previewCompact : styles.previewComfort]}>
            <Text style={styles.previewText}>{compactView ? 'Vue compacte active' : 'Vue confortable active'}</Text>
          </View>

          <View style={styles.switchRow}>
            <Text>Activer vue compacte</Text>
            <PaperSwitch value={compactView} onChange={setCompactView} />
          </View>
        </PaperCard>

        <PaperButton label="Retour" onPress={navigation.goBack} />
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
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#fff',
    borderColor: '#d1d5db',
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  message: {
    fontSize: 15,
    color: '#334155',
  },
  switchRow: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  previewBox: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#bfdbfe',
    backgroundColor: '#eff6ff',
  },
  previewComfort: {
    paddingVertical: 18,
    paddingHorizontal: 14,
  },
  previewCompact: {
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  previewText: {
    color: '#1e3a8a',
    fontWeight: '600',
  },
});

export default Exercise1PaperScreen;
