import React from 'react';
import {ContactItem, ContactName, ContactNumber, DeleteBtn} from './ContactList.styled'

const ContactList = ({ contacts, deleteContact }) => {
  console.log(contacts);
  return (
  
    <ul>
      {contacts.map(({id, name, number}) => (
        <ContactListItem
          key={id}
          id={id}
          name={name}
          number={number}
          deleteContact={deleteContact}
        />
      ))}
    </ul>

)}

const ContactListItem = ({ id, name, number, deleteContact}) => (
  
    <ContactItem>
      <ContactName>{name}</ContactName>
      <ContactNumber>{number}</ContactNumber>
      <DeleteBtn onClick={() => deleteContact(id)}>Delete</DeleteBtn>
    </ContactItem>
  
)
 export default ContactList