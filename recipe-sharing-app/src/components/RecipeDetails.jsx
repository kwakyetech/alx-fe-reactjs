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
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Recipe not found</h2>
        <button 
          onClick={() => navigate('/')} 
          className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
        >
          Back to Recipes
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <button 
        onClick={() => navigate('/')} 
        className="mb-6 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors duration-200 flex items-center gap-2"
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
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 p-6 border-b border-gray-200">
            <h1 className="text-3xl font-bold text-gray-900">{recipe.title}</h1>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleToggleFavorite}
                className={`px-4 py-2 rounded-md border-2 transition-all duration-200 text-lg ${
                  isRecipeFavorited 
                    ? 'border-red-400 bg-red-400 hover:bg-red-500 hover:border-red-500' 
                    : 'border-gray-300 bg-transparent hover:border-red-400 hover:bg-red-50'
                }`}
                title={isRecipeFavorited ? 'Remove from favorites' : 'Add to favorites'}
              >
                {isRecipeFavorited ? '❤️' : '🤍'}
              </button>
              <button 
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200"
              >
                Edit Recipe
              </button>
              <DeleteRecipeButton 
                recipeId={recipe.id} 
                onDelete={() => navigate('/')}
              />
            </div>
          </div>
          
          <div className="p-6">
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Description</h3>
              <p className="text-gray-600 leading-relaxed text-base">
                {recipe.description}
              </p>
            </div>
            
            <div className="mt-6 text-sm text-gray-500">
              <p><strong className="text-gray-700">Recipe ID:</strong> {recipe.id}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeDetails;