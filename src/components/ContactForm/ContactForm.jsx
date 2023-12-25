import { Component } from 'react';
import css from 'components/ContactForm/ContactForm.module.css';

class ContactForm extends Component {
  state = {
    number: '',
    name: '',
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.addNewContact(this.state);

    this.setState({
      number: '',
      name: '',
    });
  };

  render() {
    return (
      <>
        <h1 className={css.title}>Phonebook</h1>
        <form className={css.form} onSubmit={this.handleSubmit}>
          <label className={css.label}>Name: </label>
          <input
            className={css.input}
            onChange={this.handleChange}
            type="text"
            name="name"
            value={this.state.name}
            required
            pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          />

          <label className={css.label}>Number: </label>
          <input
            className={css.input}
            onChange={this.handleChange}
            type="tel"
            name="number"
            value={this.state.number}
            required
            pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
          />
          <button className={css.btn} type="submit">
            Add contact
          </button>
        </form>
      </>
    );
  }
}

export default ContactForm;
