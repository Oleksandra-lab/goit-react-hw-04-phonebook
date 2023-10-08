import { Component } from 'react';

import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount(){
    const stringifiedContacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(stringifiedContacts) ?? [];
    this.setState({
      contacts: parsedContacts,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state.contacts.length!==prevState.contacts.length){
      const stringifiedContacts = JSON.stringify(this.state.contacts)
      localStorage.setItem('contacts', stringifiedContacts )
    }
  }

  addContact = newContact => {
    const contactExist = this.state.contacts.some(
        contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
      );
    if (contactExist) {
      alert(`${newContact.name} is already in contacts.`);
      return;
    }
console.log("newContact", newContact);
    this.setState(prevState => {
      return {
        contacts: [...prevState.contacts, newContact],
      };
    });
  };

  deleteContact = (id) => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(contact => contact.id !== id)
      }
    })

  }
 onFilter= name => {
  this.setState({filter: name.toLowerCase()})
 }

//  filteredContacts = this.state.contacts.filter(({name}) =>name.toLowerCase().includes(this.state.filter))
filteredContacts= () =>  {const {filter, contacts} = this.state;
return contacts.filter(({name}) =>name.toLowerCase().includes(filter))
}
  render() {
    console.log(this.filteredContacts);
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm addContact={this.addContact} />
        <Filter onFilter={this.onFilter}/>
        <h2>Contacts</h2>
        <ContactList contacts={this.filteredContacts()} deleteContact={this.deleteContact}/>
      </div>
    );
  }
}
