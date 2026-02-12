import React, { useState } from 'react';
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

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Ex 1 - React Native Paper</Text>

        <TextInput
          value={name}
          onChangeText={setName}
          style={styles.input}
          placeholder="Saisir un nom"
        />

        <PaperButton label="Valider" onPress={() => setValidatedName(name.trim())} />

        <PaperCard title="Message personnalisé">
          <Text style={styles.message}>
            {validatedName ? `Bonjour ${validatedName}, bienvenue dans l'application !` : 'Aucun nom validé.'}
          </Text>
          <PaperChip text="Composant Chip" />
          <View style={styles.switchRow}>
            <Text>Notifications</Text>
            <PaperSwitch value={notifications} onChange={setNotifications} />
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
});

export default Exercise1PaperScreen;
