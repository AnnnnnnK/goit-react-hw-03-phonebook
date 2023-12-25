import React from 'react';
import css from 'components/ContactsList/ContactsList.module.css';

const ContactsList = ({ contacts, handleDelete }) => {
  return (
    <>
      <h2 className={css.title}>Contacts</h2>
      <ul>
        {contacts.map(({ name, number, id }) => (
          <li key={id} className={css.item}>
            <p>
              {name}: {number}
            </p>
            <button className={css.btn} onClick={() => handleDelete(id)}>
              delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};
export default ContactsList;
