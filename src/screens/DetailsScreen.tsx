import React, { useState } from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { AppNavigation, Route } from '../navigation/types';
import { deleteStoredContact } from '../storage/contactStorage';

type DetailsScreenProps = {
  navigation: AppNavigation;
  route: Route<'Details'>;
};

function DetailsScreen({ navigation, route }: DetailsScreenProps) {
  const { contact } = route.params;
  const [fontSize, setFontSize] = useState(18);

  const handleDelete = () => {
    Alert.alert('Confirmation', 'Voulez-vous supprimer ce contact ?', [
      { text: 'Annuler', style: 'cancel' },
      {
        text: 'Supprimer',
        style: 'destructive',
        onPress: async () => {
          await deleteStoredContact(contact.id);
          navigation.navigate('Home', {
            refreshAt: Date.now(),
            toastMessage: 'Contact supprimé.',
          });
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Détails du contact</Text>

        <View style={styles.card}>
          <Text style={[styles.nameText, { fontSize }]}>{contact.name}</Text>
          <Text style={[styles.phoneText, { fontSize: fontSize - 2 }]}>{contact.phone}</Text>
        </View>

        <View style={styles.fontActions}>
          <TouchableOpacity style={styles.fontButton} onPress={() => setFontSize(size => Math.max(14, size - 2))}>
            <Text style={styles.fontButtonText}>A-</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.fontButton} onPress={() => setFontSize(size => Math.min(34, size + 2))}>
            <Text style={styles.fontButtonText}>A+</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.deleteButtonText}>Supprimer</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.backButton} onPress={navigation.goBack}>
          <Text style={styles.backButtonText}>Retour</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#0f172a',
    textAlign: 'center',
    marginBottom: 22,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 18,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginBottom: 14,
  },
  nameText: {
    fontWeight: '800',
    color: '#111827',
  },
  phoneText: {
    marginTop: 8,
    color: '#374151',
  },
  fontActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 16,
  },
  fontButton: {
    backgroundColor: '#e2e8f0',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  fontButtonText: {
    fontWeight: '700',
    color: '#334155',
  },
  deleteButton: {
    backgroundColor: '#dc2626',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  backButton: {
    marginTop: 10,
    alignItems: 'center',
    paddingVertical: 8,
  },
  backButtonText: {
    color: '#334155',
    fontWeight: '600',
  },
});

export default DetailsScreen;
