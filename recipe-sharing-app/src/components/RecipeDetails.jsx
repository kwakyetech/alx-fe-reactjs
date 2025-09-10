import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useRecipeStore from './recipeStore';
import EditRecipeForm from './EditRecipeForm';
import DeleteRecipeButton from './DeleteRecipeButton';

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const recipe = useRecipeStore(state => 
    state.recipes.find(recipe => recipe.id === parseInt(id))
  );
  const favorites = useRecipeStore(state => state.favorites);
  const addFavorite = useRecipeStore(state => state.addFavorite);
  const removeFavorite = useRecipeStore(state => state.removeFavorite);
  const [isEditing, setIsEditing] = React.useState(false);

  const handleToggleFavorite = () => {
    if (favorites.includes(recipe.id)) {
      removeFavorite(recipe.id);
    } else {
      addFavorite(recipe.id);
    }
  };

  const isRecipeFavorited = favorites.includes(recipe.id);

  if (!recipe) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Recipe not found</h2>
        <button onClick={() => navigate('/')} style={{
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}>
          Back to Recipes
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <button 
        onClick={() => navigate('/')} 
        style={{
          marginBottom: '20px',
          padding: '8px 16px',
          backgroundColor: '#6c757d',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        ← Back to Recipes
      </button>
      
      {isEditing ? (
        <EditRecipeForm 
          recipe={recipe} 
          onCancel={() => setIsEditing(false)}
          onSave={() => setIsEditing(false)}
        />
      ) : (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
            <h1 style={{ margin: '0', color: '#333' }}>{recipe.title}</h1>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={handleToggleFavorite}
                style={{
                  background: 'transparent',
                  border: `2px solid ${isRecipeFavorited ? '#ff6b6b' : '#ddd'}`,
                  padding: '8px 12px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '18px',
                  transition: 'all 0.2s ease',
                  backgroundColor: isRecipeFavorited ? '#ff6b6b' : 'transparent'
                }}
                title={isRecipeFavorited ? 'Remove from favorites' : 'Add to favorites'}
              >
                {isRecipeFavorited ? '❤️' : '🤍'}
              </button>
              <button 
                onClick={() => setIsEditing(true)}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Edit Recipe
              </button>
              <DeleteRecipeButton 
                recipeId={recipe.id} 
                onDelete={() => navigate('/')}
              />
            </div>
          </div>
          
          <div style={{
            backgroundColor: '#f8f9fa',
            padding: '20px',
            borderRadius: '8px',
            border: '1px solid #dee2e6'
          }}>
            <h3 style={{ marginTop: '0', color: '#495057' }}>Description</h3>
            <p style={{ 
              lineHeight: '1.6', 
              color: '#6c757d',
              fontSize: '16px',
              margin: '0'
            }}>
              {recipe.description}
            </p>
          </div>
          
          <div style={{ marginTop: '20px', fontSize: '14px', color: '#6c757d' }}>
            <p><strong>Recipe ID:</strong> {recipe.id}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeDetails;