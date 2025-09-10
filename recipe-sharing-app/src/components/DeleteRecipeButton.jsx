import React, { useState } from 'react';
import useRecipeStore from './recipeStore';

const DeleteRecipeButton = ({ recipeId, onDelete }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const deleteRecipe = useRecipeStore(state => state.deleteRecipe);

  const handleDelete = () => {
    deleteRecipe(recipeId);
    if (onDelete) {
      onDelete();
    }
    setShowConfirm(false);
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  if (showConfirm) {
    return (
      <div style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '10px',
        backgroundColor: '#fff3cd',
        border: '1px solid #ffeaa7',
        borderRadius: '4px',
        minWidth: '200px'
      }}>
        <p style={{
          margin: '0 0 10px 0',
          fontSize: '14px',
          color: '#856404',
          textAlign: 'center'
        }}>
          Are you sure you want to delete this recipe?
        </p>
        
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={handleDelete}
            style={{
              padding: '6px 12px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '12px'
            }}
          >
            Yes, Delete
          </button>
          
          <button
            onClick={handleCancel}
            style={{
              padding: '6px 12px',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '12px'
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={() => setShowConfirm(true)}
      style={{
        padding: '8px 16px',
        backgroundColor: '#dc3545',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px'
      }}
      onMouseOver={(e) => {
        e.target.style.backgroundColor = '#c82333';
      }}
      onMouseOut={(e) => {
        e.target.style.backgroundColor = '#dc3545';
      }}
    >
      Delete Recipe
    </button>
  );
};

export default DeleteRecipeButton;