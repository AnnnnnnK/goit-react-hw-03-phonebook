import React from 'react';
import css from 'components/Filter/Filter.module.css';

const Filter = ({ value, onChange }) => {
  return (
    <input
      className={css.input}
      type="search"
      value={value}
      onChange={onChange}
      placeholder="Find name"
    />
  );
};

export default Filter;
