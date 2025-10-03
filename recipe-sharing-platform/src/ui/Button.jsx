import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  disabled = false, 
  onClick, 
  type = 'button',
  className = '',
  ...props 
}) => {
  // Base styles that apply to all buttons
  const baseStyles = 'font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  // Variant styles
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 shadow-md hover:shadow-lg',
    secondary: 'border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:ring-gray-500 shadow-md hover:shadow-lg',
    link: 'text-blue-600 hover:text-blue-800 underline-offset-4 hover:underline'
  };
  
  // Size styles
  const sizes = {
    small: 'px-3 py-1.5 text-sm rounded-md',
    medium: 'px-6 py-3 text-base rounded-lg',
    large: 'px-8 py-4 text-lg rounded-lg'
  };
  
  // Disabled styles
  const disabledStyles = disabled 
    ? 'bg-gray-400 cursor-not-allowed hover:bg-gray-400 hover:shadow-md' 
    : '';
  
  // Combine all styles
  const buttonStyles = `
    ${baseStyles}
    ${variants[variant] || variants.primary}
    ${sizes[size] || sizes.medium}
    ${disabledStyles}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={buttonStyles}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;