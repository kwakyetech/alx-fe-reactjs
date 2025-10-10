import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Validation schema using Yup
const validationSchema = Yup.object({
  username: Yup.string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be less than 20 characters')
    .required('Username is required'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    )
    .required('Password is required')
});

const FormikForm = () => {
  // Initial form values
  const initialValues = {
    username: '',
    email: '',
    password: ''
  };

  // Handle form submission
  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted', values);
      alert('Registration successful');
      resetForm();
      setSubmitting(false);
    }, 1000);
  };

  return (
    <div style={{ maxWidth: '400px', margin: '20px auto', padding: '20px' }}>
      <h2>User Registration</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form>
            <div style={{ marginBottom: '15px' }}>
              <label htmlFor="username" style={{ display: 'block', marginBottom: '5px' }}>
                Username:
              </label>
              <Field
                type="text"
                id="username"
                name="username"
                placeholder="Enter your username"
                style={{
                  width: '100%',
                  padding: '8px',
                  border: errors.username && touched.username ? '2px solid red' : '1px solid #ccc',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}
              />
              <ErrorMessage 
                name="username" 
                component="div" 
                style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>
                Email:
              </label>
              <Field
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                style={{
                  width: '100%',
                  padding: '8px',
                  border: errors.email && touched.email ? '2px solid red' : '1px solid #ccc',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}
              />
              <ErrorMessage 
                name="email" 
                component="div" 
                style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>
                Password:
              </label>
              <Field
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                style={{
                  width: '100%',
                  padding: '8px',
                  border: errors.password && touched.password ? '2px solid red' : '1px solid #ccc',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}
              />
              <ErrorMessage 
                name="password" 
                component="div" 
                style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                width: '100%',
                padding: '10px',
                backgroundColor: isSubmitting ? '#ccc' : '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: '16px',
                cursor: isSubmitting ? 'not-allowed' : 'pointer'
              }}
            >
              {isSubmitting ? 'Registering...' : 'Register'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormikForm;