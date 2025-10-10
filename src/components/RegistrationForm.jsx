import { useState } from 'react';

const RegistrationForm = () => {
  // State for form fields
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  // State for validation errors
  const [errors, setErrors] = useState({});

  // State for form submission
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: ''
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    return newErrors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formErrors = validateForm();
    
    if (Object.keys(formErrors).length === 0) {
      // Form is valid, simulate API call
      console.log('Form submitted successfully:', formData);
      alert('Registration successful!');
      
      // Reset form
      setFormData({
        username: '',
        email: '',
        password: ''
      });
    } else {
      setErrors(formErrors);
    }

    setIsSubmitting(false);
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
      <h2>User Registration (Controlled Components)</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="username" style={{ display: 'block', marginBottom: '5px' }}>
            Username:
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '8px',
              border: errors.username ? '2px solid red' : '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '14px'
            }}
            placeholder="Enter your username"
          />
          {errors.username && (
            <span style={{ color: 'red', fontSize: '12px' }}>{errors.username}</span>
          )}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '8px',
              border: errors.email ? '2px solid red' : '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '14px'
            }}
            placeholder="Enter your email"
          />
          {errors.email && (
            <span style={{ color: 'red', fontSize: '12px' }}>{errors.email}</span>
          )}
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '8px',
              border: errors.password ? '2px solid red' : '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '14px'
            }}
            placeholder="Enter your password"
          />
          {errors.password && (
            <span style={{ color: 'red', fontSize: '12px' }}>{errors.password}</span>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: isSubmitting ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            cursor: isSubmitting ? 'not-allowed' : 'pointer'
          }}
        >
          {isSubmitting ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;