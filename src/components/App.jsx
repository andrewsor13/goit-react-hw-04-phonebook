import React, { useEffect, useState } from 'react';
import ContactForm from '../components/ContactForm/ContactForm';
import ContactList from '../components/ContactList/ContactList';
import Filter from '../components/Filter/Filter';
import styles from './App.module.css';
import '../index.css';

export default function App() {
  const [state, setState] = useState({
    contacts: [],
    filter: '',
    name: '',
    number: '',
    divHeight: 0,
  });

  useEffect(() => {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      const parsedContacts = JSON.parse(storedContacts);
      if (parsedContacts.length !== 0) {
        setState(prevState => ({
          ...prevState,
          contacts: parsedContacts,
          divHeight: parsedContacts.length * 60 + 60,
        }));
      } else {
        setState(prevState => ({
          ...prevState,
          contacts: parsedContacts,
          divHeight: 80,
        }));
      }
    } else {
      setState(prevState => ({
        ...prevState,
        contacts: [],
        divHeight: 60,
      }));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(state.contacts));
  }, [state.contacts]);

  const handleAddContact = newContact => {
    const isNameAlreadyExist = state.contacts.some(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );

    if (isNameAlreadyExist) {
      alert(`Contact with the name '${newContact.name}' already exists.`);
    } else {
      setState(prevState => ({
        ...prevState,
        contacts: [...prevState.contacts, newContact],
        divHeight: prevState.divHeight + 60,
      }));
    }
  };

  const handleDeleteContact = contactId => {
    const updatedContacts = state.contacts.filter(
      contact => contact.id !== contactId
    );
    setState({
      ...state,
      contacts: updatedContacts,
      divHeight: state.divHeight - 60,
    });
  };

  return (
    <div className="App">
      <div className={styles.phonebook}>
        <h1 className={styles.phonebook_title}>Phonebook</h1>
        <ContactForm onSubmit={handleAddContact} />
      </div>

      <div
        className={styles.contacts}
        style={{ height: `${state.divHeight}px` }}
      >
        <h2 className={styles.contacts_title}>Contacts</h2>
        <Filter
          value={state.filter}
          onChange={value => setState({ ...state, filter: value })}
        />

        <ContactList
          contacts={state.contacts}
          filter={state.filter}
          onDeleteContact={handleDeleteContact}
        />
      </div>
    </div>
  );
}
