import React from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import styles from './ContactForm.module.css';

export default function ContactForm({ onSubmit }) {
  const initialValues = {
    name: '',
    number: '',
  };

  const validate = values => {
    const errors = {};
    if (!values.name) {
      errors.name = 'Name is required';
    }
    if (!values.number) {
      errors.number = 'Phone number is required';
    } else if (!/^\+?\d+$/.test(values.number)) {
      errors.number = 'Invalid phone number';
    }
    return errors;
  };

  const handleSubmit = (values, actions) => {
    const newContact = {
      id: nanoid(),
      name: values.name,
      number: values.number,
    };

    onSubmit(newContact);
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form className={styles.form_container}>
          <div>
            <h3>Name</h3>
            <Field
              type="text"
              name="name"
              placeholder="Enter a name"
              className={styles.form_input}
            />
            {errors.name && touched.name && (
              <div style={{ color: 'red' }}>{errors.name}</div>
            )}
          </div>
          <div>
            <h3>Number</h3>
            <Field
              type="text"
              name="number"
              placeholder="Enter a phone number"
              className={styles.form_input}
            />
            {errors.number && touched.number && (
              <div style={{ color: 'red' }}>{errors.number}</div>
            )}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={styles.button}
          >
            Add Contact
          </button>
        </Form>
      )}
    </Formik>
  );
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
