import { Component } from 'react';
import ContactForm from './ContactForm/ContactForm';
import { nanoid } from 'nanoid';
import ContactsList from './ContactsList/ContactsList';
import Filter from './Filter/Filter';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import data from '../components/contacts.json';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const localData = localStorage.getItem('contacts');
    if (localData && JSON.parse(localData).length > 0) {
      this.setState({
        contacts: JSON.parse(localData),
      });
    } else
      this.setState({
        contacts: data,
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts?.length !== this.state.contacts.length) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }
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
        <ContactForm addNewContact={this.addNewContact} />
        <Filter value={filter} onChange={this.changeFilter} />
        {this.state.contacts.length > 1 && (
          <ContactsList
            contacts={shownContacts}
            handleDelete={this.onRemoveContact}
          />
        )}
      </>
    );
  }
}
export default App;
