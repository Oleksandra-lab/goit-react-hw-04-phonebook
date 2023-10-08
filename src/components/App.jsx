import React from 'react';
import { useState, useEffect } from 'react';

import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

const App = () => {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);

  const [filter, setFilter] = useState('');

  useEffect(() => {
    const stringifiedContacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(stringifiedContacts);
    setContacts({
      contacts: parsedContacts,
    });
  }, []);

  useEffect(() => {
          const stringifiedContacts = JSON.stringify(contacts)
          localStorage.setItem('contacts', stringifiedContacts )
     }, [contacts]);

  const addContact = newContact => {
    const contactExist = contacts.some(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );
    if (contactExist) {
      alert(`${newContact.name} is already in contacts.`);
      return;
    }
    setContacts(prevContacts => [...prevContacts, newContact]);
  };

  const deleteContact = id => {
    setContacts(contacts => contacts.filter(contact => contact.id !== id));
  };

  const onFilter = name => {
    setFilter({ filter: name.toLowerCase() });
  };

  const filteredContacts = () => {
    contacts.filter(({ name }) => name.toLowerCase().includes(filter));
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onAddContact={addContact} />
      <Filter onFilter={onFilter} />
      <h2>Contacts</h2>
      <ContactList
        contacts={filteredContacts()}
        onDeleteContact={deleteContact}
      />
    </div>
  );
};

export default App;
