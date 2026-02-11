import AsyncStorage from './asyncStorage';
import { Contact } from '../types/contact';

const CONTACTS_KEY = 'contacts';
const CONTACTS_SEEDED_KEY = 'contacts_seeded';

export async function getStoredContacts(): Promise<Contact[]> {
  const rawContacts = await AsyncStorage.getItem(CONTACTS_KEY);

  if (!rawContacts) {
    return [];
  }

  try {
    const parsedContacts = JSON.parse(rawContacts) as Contact[];
    return Array.isArray(parsedContacts) ? parsedContacts : [];
  } catch {
    return [];
  }
}

export async function saveContacts(contacts: Contact[]): Promise<void> {
  await AsyncStorage.setItem(CONTACTS_KEY, JSON.stringify(contacts));
}

export async function seedContactsOnce(initialContacts: Contact[]): Promise<Contact[]> {
  const wasSeeded = await AsyncStorage.getItem(CONTACTS_SEEDED_KEY);
  const existingContacts = await getStoredContacts();

  if (!wasSeeded && existingContacts.length === 0) {
    await saveContacts(initialContacts);
    await AsyncStorage.setItem(CONTACTS_SEEDED_KEY, 'true');
    return initialContacts;
  }

  return existingContacts;
}

export async function addStoredContact(contact: Contact): Promise<void> {
  const contacts = await getStoredContacts();
  await saveContacts([contact, ...contacts]);
}

export async function deleteStoredContact(contactId: string): Promise<void> {
  const contacts = await getStoredContacts();
  const filteredContacts = contacts.filter(contact => contact.id !== contactId);
  await saveContacts(filteredContacts);
}
