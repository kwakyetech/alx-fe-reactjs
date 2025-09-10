import React, { useState } from 'react';
import useRecipeStore from './recipeStore';

const EditRecipeForm = ({ recipe, onCancel, onSave }) => {
  const [title, setTitle] = useState(recipe.title);
  const [description, setDescription] = useState(recipe.description);
  const [errors, setErrors] = useState({});
  const updateRecipe = useRecipeStore(state => state.updateRecipe);

  const validateForm = () => {
    const newErrors = {};
    
    if (!title.trim()) {
      newErrors.title = 'Recipe title is required';
    }
    
    if (!description.trim()) {
      newErrors.description = 'Recipe description is required';
    } else if (description.trim().length < 10) {
      newErrors.description = 'Description must be at least 10 characters long';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (validateForm()) {
      const updatedRecipe = {
        ...recipe,
        title: title.trim(),
        description: description.trim()
      };
      
      updateRecipe(updatedRecipe);
      onSave();
    }
  };

  return (
    <div style={{
      backgroundColor: '#f8f9fa',
      padding: '20px',
      borderRadius: '8px',
      border: '1px solid #dee2e6'
    }}>
      <h2 style={{ marginTop: '0', color: '#333' }}>Edit Recipe</h2>
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="title" style={{
            display: 'block',
            marginBottom: '5px',
            fontWeight: 'bold',
            color: '#495057'
          }}>
            Recipe Title:
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              border: errors.title ? '2px solid #dc3545' : '1px solid #ced4da',
              borderRadius: '4px',
              fontSize: '16px',
              boxSizing: 'border-box'
            }}
            placeholder="Enter recipe title"
          />
          {errors.title && (
            <span style={{ color: '#dc3545', fontSize: '14px', marginTop: '5px', display: 'block' }}>
              {errors.title}
            </span>
          )}
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="description" style={{
            display: 'block',
            marginBottom: '5px',
            fontWeight: 'bold',
            color: '#495057'
          }}>
            Description:
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            style={{
              width: '100%',
              padding: '10px',
              border: errors.description ? '2px solid #dc3545' : '1px solid #ced4da',
              borderRadius: '4px',
              fontSize: '16px',
              resize: 'vertical',
              boxSizing: 'border-box'
            }}
            placeholder="Enter recipe description"
          />
          {errors.description && (
            <span style={{ color: '#dc3545', fontSize: '14px', marginTop: '5px', display: 'block' }}>
              {errors.description}
            </span>
          )}
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            type="submit"
            style={{
              padding: '10px 20px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Save Changes
          </button>
          
          <button
            type="button"
            onClick={onCancel}
            style={{
              padding: '10px 20px',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditRecipeForm;