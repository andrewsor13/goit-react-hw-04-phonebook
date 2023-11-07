import React from 'react';
import styles from './Filter.module.css';

export default function Filter({ value, onChange }) {
  return (
    <div className={styles.container}>
      <label htmlFor="filter">Filter by Name:</label>
      <input
        type="text"
        id="filter"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Search by name"
        className={styles.input}
      />
    </div>
  );
}
