import AsyncStorage from './asyncStorage';
import { Contact } from '../types/contact';

const CONTACTS_KEY = 'contacts';

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

export async function addStoredContact(contact: Contact): Promise<void> {
  const contacts = await getStoredContacts();
  await saveContacts([contact, ...contacts]);
}

export async function deleteStoredContact(contactId: string): Promise<void> {
  const contacts = await getStoredContacts();
  const filteredContacts = contacts.filter(contact => contact.id !== contactId);
  await saveContacts(filteredContacts);
}
