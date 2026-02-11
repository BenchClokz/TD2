import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Contact from '../components/Contact';
import { AppNavigation, Route } from '../navigation/types';
import { Contact as ContactType } from '../types/contact';
import { getStoredContacts, saveContacts } from '../storage/contactStorage';

type HomeScreenProps = {
  navigation: AppNavigation;
  route: Route<'Home'>;
};

const staticContacts: ContactType[] = [
  { id: 'demo-1', name: 'Alice Dupont', phone: '06 11 22 33 44' },
  { id: 'demo-2', name: 'Brahim Karim', phone: '07 55 10 90 80' },
  { id: 'demo-3', name: 'Chloé Martin', phone: '01 80 60 70 50' },
];

function HomeScreen({ navigation, route }: HomeScreenProps) {
  const [contacts, setContacts] = useState<ContactType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [toastMessage, setToastMessage] = useState(route.params?.toastMessage ?? '');

  const loadContacts = useCallback(async () => {
    setLoading(true);
    const storedContacts = await getStoredContacts();

    if (storedContacts.length === 0) {
      await saveContacts(staticContacts);
      setContacts(staticContacts);
    } else {
      setContacts(storedContacts);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    loadContacts();
  }, [loadContacts, route.params?.refreshAt]);

  useEffect(() => {
    if (route.params?.toastMessage) {
      setToastMessage(route.params.toastMessage);
      const timer = setTimeout(() => setToastMessage(''), 1800);
      return () => clearTimeout(timer);
    }

    return undefined;
  }, [route.params?.toastMessage]);

  const filteredContacts = useMemo(
    () =>
      contacts.filter(contact =>
        `${contact.name} ${contact.phone}`.toLowerCase().includes(searchText.trim().toLowerCase()),
      ),
    [contacts, searchText],
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.page}>
        <Text style={styles.title}>Carnet de contacts</Text>
        <TextInput
          placeholder="Rechercher un contact"
          value={searchText}
          onChangeText={setSearchText}
          style={styles.searchInput}
        />

        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddContact', undefined)}>
          <Text style={styles.addButtonText}>+ Ajouter un contact</Text>
        </TouchableOpacity>

        {toastMessage ? <Text style={styles.toast}>{toastMessage}</Text> : null}

        {loading ? (
          <Text style={styles.infoText}>Chargement...</Text>
        ) : filteredContacts.length === 0 ? (
          <Text style={styles.infoText}>Aucun contact</Text>
        ) : (
          <View style={styles.listBox}>
            <FlatList
              data={filteredContacts}
              keyExtractor={item => item.id}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <Contact
                  name={item.name}
                  phone={item.phone}
                  onPress={() => navigation.navigate('Details', { contact: item })}
                />
              )}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  page: {
    padding: 16,
    paddingBottom: 28,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: 12,
  },
  searchInput: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
  },
  addButton: {
    backgroundColor: '#2563eb',
    paddingVertical: 11,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 12,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  listBox: {
    marginTop: 4,
    padding: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    backgroundColor: '#ffffff',
  },
  infoText: {
    marginTop: 8,
    fontSize: 16,
    color: '#4b5563',
    textAlign: 'center',
  },
  toast: {
    alignSelf: 'center',
    marginBottom: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    color: '#065f46',
    backgroundColor: '#d1fae5',
    overflow: 'hidden',
    fontWeight: '600',
  },
});

export default HomeScreen;
