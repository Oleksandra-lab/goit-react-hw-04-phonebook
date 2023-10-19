import React from 'react';
import { useState, useEffect } from 'react';

import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

const App = () => {
  const [contacts, setContacts] = useState(() => {

    return JSON.parse(localStorage.getItem('contacts')) ?? []

  });
  const [filter, setFilter] = useState('');
  
  useEffect(() => {
    const stringifiedContacts = JSON.stringify(contacts);
    localStorage.setItem('contacts', stringifiedContacts);
  }, [contacts]);

  const addContact = newContact => {
    const contactExist = contacts.some(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );
    if (contactExist) {
      alert(`${newContact.name} is already in contacts.`);
      return;
    }
    setContacts((prevContacts) => [...prevContacts, newContact]);
  };

  const deleteContact = id => {
    setContacts((prevContacts) =>
      prevContacts.filter((contact) => contact.id !== id)
    );
  };

  const handleFilterChange = filter => {
    setFilter(filter);
  };

  const getFilteredContacts = 
    contacts.filter(({ name }) => name.toLowerCase().includes(filter.toLowerCase()));
// const filteredContacts = getFilteredContacts()
  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onAddContact={addContact} />
      <Filter onFilter={handleFilterChange} />
      <h2>Contacts</h2>
      <ContactList
        contacts={getFilteredContacts}
        onDeleteContact={deleteContact}
      />
    </div>
  );
};

export default App;
