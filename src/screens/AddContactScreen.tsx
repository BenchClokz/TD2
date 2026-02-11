import React, { useState } from 'react';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { AppNavigation } from '../navigation/types';
import { addStoredContact } from '../storage/contactStorage';

type AddContactScreenProps = {
  navigation: AppNavigation;
};

function AddContactScreen({ navigation }: AddContactScreenProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleAddContact = async () => {
    if (!name.trim() || !phone.trim()) {
      setErrorMessage('Veuillez remplir les deux champs.');
      return;
    }

    try {
      await addStoredContact({
        id: `${Date.now()}`,
        name: name.trim(),
        phone: phone.trim(),
      });

      navigation.navigate('Home', {
        refreshAt: Date.now(),
        toastMessage: 'Contact ajouté avec succès.',
      });
    } catch {
      Alert.alert('Erreur', "Impossible d'ajouter le contact pour le moment.");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Ajouter un contact</Text>
        <TextInput
          placeholder="Nom"
          value={name}
          onChangeText={text => {
            setName(text);
            if (errorMessage) {
              setErrorMessage('');
            }
          }}
          style={styles.input}
        />
        <TextInput
          placeholder="Téléphone"
          value={phone}
          keyboardType="phone-pad"
          onChangeText={text => {
            setPhone(text);
            if (errorMessage) {
              setErrorMessage('');
            }
          }}
          style={styles.input}
        />

        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

        <TouchableOpacity style={styles.addButton} onPress={handleAddContact}>
          <Text style={styles.addButtonText}>Ajouter</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.backButton} onPress={navigation.goBack}>
          <Text style={styles.backButtonText}>Retour</Text>
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
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 16,
    color: '#0f172a',
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 10,
    paddingVertical: 11,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  errorText: {
    alignSelf: 'flex-start',
    color: '#dc2626',
    marginBottom: 8,
    fontWeight: '600',
  },
  addButton: {
    width: '100%',
    backgroundColor: '#2563eb',
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 12,
    marginTop: 6,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  backButton: {
    marginTop: 10,
    paddingVertical: 8,
  },
  backButtonText: {
    color: '#334155',
    fontWeight: '600',
  },
});

export default AddContactScreen;
