import React from 'react';
import PropTypes from 'prop-types';
import ContactItem from '../ContactItem/ContactItem';
import styles from './ContactList.module.css';

export default function ContactList({ contacts, filter, onDeleteContact }) {
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter && filter.toLowerCase())
  );

  return (
    <ul className={styles.contact_list}>
      {filteredContacts.map(contact => (
        <li key={contact.id}>
          <ContactItem contact={contact} />
          <button
            className={styles.button}
            onClick={() => onDeleteContact(contact.id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};
