import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Yup validation schema
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

  // Form submission handler
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      // Simulate API call
      console.log('Form submitted with Formik:', values);

      // Simulate async operation
      await new Promise(resolve => setTimeout(resolve, 1000));

      alert('Registration successful with Formik!');

      // Reset form after successful submission
      resetForm();
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return React.createElement(
    'div',
    { className: 'max-w-md mx-auto bg-white rounded-lg shadow-md p-6' },
    React.createElement(
      'h2',
      { className: 'text-2xl font-bold text-gray-800 mb-6 text-center' },
      'User Registration (Formik)'
    ),
    React.createElement(
      Formik,
      {
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: handleSubmit
      },
      ({ isSubmitting, errors, touched }) => (
        React.createElement(
          Form,
          { className: 'space-y-4' },

          // Username Field
          React.createElement(
            'div',
            null,
            React.createElement(
              'label',
              { htmlFor: 'username', className: 'block text-sm font-medium text-gray-700 mb-1' },
              'Username'
            ),
            React.createElement(Field, {
              type: 'text',
              id: 'username',
              name: 'username',
              className: `w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.username && touched.username ? 'border-red-500' : 'border-gray-300'
              }`,
              placeholder: 'Enter your username'
            }),
            React.createElement(ErrorMessage, {
              name: 'username',
              component: 'p',
              className: 'mt-1 text-sm text-red-600'
            })
          ),

          // Email Field
          React.createElement(
            'div',
            null,
            React.createElement(
              'label',
              { htmlFor: 'email', className: 'block text-sm font-medium text-gray-700 mb-1' },
              'Email'
            ),
            React.createElement(Field, {
              type: 'email',
              id: 'email',
              name: 'email',
              className: `w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.email && touched.email ? 'border-red-500' : 'border-gray-300'
              }`,
              placeholder: 'Enter your email'
            }),
            React.createElement(ErrorMessage, {
              name: 'email',
              component: 'p',
              className: 'mt-1 text-sm text-red-600'
            })
          ),

          // Password Field
          React.createElement(
            'div',
            null,
            React.createElement(
              'label',
              { htmlFor: 'password', className: 'block text-sm font-medium text-gray-700 mb-1' },
              'Password'
            ),
            React.createElement(Field, {
              type: 'password',
              id: 'password',
              name: 'password',
              className: `w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.password && touched.password ? 'border-red-500' : 'border-gray-300'
              }`,
              placeholder: 'Enter your password'
            }),
            React.createElement(ErrorMessage, {
              name: 'password',
              component: 'p',
              className: 'mt-1 text-sm text-red-600'
            })
          ),

          // Submit Button
          React.createElement(
            'button',
            {
              type: 'submit',
              disabled: isSubmitting,
              className: `w-full py-2 px-4 rounded-md font-medium transition-colors duration-200 ${
                isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
              } text-white`
            },
            isSubmitting ? 'Registering...' : 'Register with Formik'
          )
        )
      )
    )
  );
};

export default FormikForm;