import { Link } from 'react-router-dom';
import useRecipeStore from './recipeStore';

const RecipeList = () => {
  const recipes = useRecipeStore(state => state.recipes);
  const filteredRecipes = useRecipeStore(state => state.filteredRecipes);
  const searchTerm = useRecipeStore(state => state.searchTerm);

  // Use filteredRecipes if there's a search term, otherwise use all recipes
  const displayRecipes = searchTerm ? filteredRecipes : recipes;

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
          </div>
        ))
      )}
    </div>
  );
};

export default RecipeList;