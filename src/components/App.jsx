import { Component } from 'react';
import ContactForm from './ContactForm/ContactForm';
import { nanoid } from 'nanoid';
import ContactsList from './ContactsList/ContactsList';
import Filter from './Filter/Filter';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
    name: '',
    number: '',
  };

  addNewContact = newContact => {
    const { contacts } = this.state;

    const nameIsAdded = contacts.some(
      ({ name }) => name.toLowerCase() === newContact.name.toLowerCase()
    );

    if (nameIsAdded) {
      Notify.warning('Name is already added.');
    } else {
      this.setState(prev => ({
        contacts: [...prev.contacts, { ...newContact, id: nanoid() }],
      }));
    }
  };

  filteredContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };
  filter = findName => {
    this.setState(() => ({
      filter: findName,
    }));
  };

  onRemoveContact = contactId => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const { contacts, filter } = this.state;
    const shownContacts = filter
      ? contacts.filter(contact =>
          contact.name.toLowerCase().includes(filter.toLowerCase())
        )
      : contacts;
    return (
      <>
        <ContactForm addNewContact={this.addNewContact}></ContactForm>
        <Filter value={filter} onChange={this.changeFilter}></Filter>
        <ContactsList
          contacts={shownContacts}
          handleDelete={this.onRemoveContact}
        ></ContactsList>
      </>
    );
  }
}
export default App;
