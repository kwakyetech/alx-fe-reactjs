import { Link } from 'react-router-dom';
import useRecipeStore from './recipeStore';

const RecipeList = () => {
  const recipes = useRecipeStore(state => state.recipes);
  const filteredRecipes = useRecipeStore(state => state.filteredRecipes);
  const searchTerm = useRecipeStore(state => state.searchTerm);
  const favorites = useRecipeStore(state => state.favorites);
  const addFavorite = useRecipeStore(state => state.addFavorite);
  const removeFavorite = useRecipeStore(state => state.removeFavorite);

  // Use filteredRecipes if there's a search term, otherwise use all recipes
  const displayRecipes = searchTerm ? filteredRecipes : recipes;

  const handleToggleFavorite = (recipeId) => {
    if (favorites.includes(recipeId)) {
      removeFavorite(recipeId);
    } else {
      addFavorite(recipeId);
    }
  };

  const isRecipeFavorited = (recipeId) => {
    return favorites.includes(recipeId);
  };

  return (
    <div>
      <h2>Recipe List</h2>
      {recipes.length === 0 ? (
        <p>No recipes available. Add some recipes to get started!</p>
      ) : displayRecipes.length === 0 ? (
        <p>No recipes found matching "{searchTerm}". Try a different search term!</p>
      ) : (
        displayRecipes.map(recipe => (
          <div key={recipe.id} style={{ 
            border: '1px solid #ccc', 
            margin: '10px', 
            padding: '15px', 
            borderRadius: '8px',
            backgroundColor: '#f8f9fa',
            transition: 'box-shadow 0.2s ease'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>{recipe.title}</h3>
                <p style={{ 
                  margin: '0 0 15px 0', 
                  color: '#666',
                  lineHeight: '1.4',
                  maxHeight: '60px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {recipe.description.length > 100 
                    ? `${recipe.description.substring(0, 100)}...` 
                    : recipe.description
                  }
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <Link 
                to={`/recipe/${recipe.id}`}
                style={{
                  display: 'inline-block',
                  padding: '8px 16px',
                  backgroundColor: '#007bff',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '4px',
                  fontSize: '14px',
                  transition: 'background-color 0.2s ease'
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = '#0056b3';
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = '#007bff';
                }}
              >
                View Details
              </Link>
              <button
                onClick={() => handleToggleFavorite(recipe.id)}
                style={{
                  background: 'transparent',
                  border: `2px solid ${isRecipeFavorited(recipe.id) ? '#ff6b6b' : '#ddd'}`,
                  padding: '6px 12px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  transition: 'all 0.2s ease',
                  backgroundColor: isRecipeFavorited(recipe.id) ? '#ff6b6b' : 'transparent'
                }}
                title={isRecipeFavorited(recipe.id) ? 'Remove from favorites' : 'Add to favorites'}
                onMouseOver={(e) => {
                  if (!isRecipeFavorited(recipe.id)) {
                    e.target.style.borderColor = '#ff6b6b';
                    e.target.style.backgroundColor = '#fff5f5';
                  }
                }}
                onMouseOut={(e) => {
                  if (!isRecipeFavorited(recipe.id)) {
                    e.target.style.borderColor = '#ddd';
                    e.target.style.backgroundColor = 'transparent';
                  }
                }}
              >
                {isRecipeFavorited(recipe.id) ? '❤️' : '🤍'}
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default RecipeList;