import React from 'react';
import { Link } from 'react-router-dom';
import useRecipeStore from './recipeStore';

const FavoritesList = () => {
  const recipes = useRecipeStore(state => state.recipes);
  const favorites = useRecipeStore(state => state.favorites);
  const removeFavorite = useRecipeStore(state => state.removeFavorite);

  // Get favorite recipes by matching IDs
  const favoriteRecipes = favorites.map(id => 
    recipes.find(recipe => recipe.id === id)
  ).filter(Boolean); // Remove any undefined entries

  const handleRemoveFavorite = (recipeId) => {
    removeFavorite(recipeId);
  };

  if (favoriteRecipes.length === 0) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">My Favorites</h2>
        <div className="text-center py-16 px-6 bg-gray-50 rounded-xl">
          <p className="text-lg text-gray-600 mb-3">You haven't added any favorites yet.</p>
          <p className="text-lg text-gray-600">Start exploring recipes and add them to your favorites!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">My Favorites</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favoriteRecipes.map(recipe => (
          <div key={recipe.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-1 overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{recipe.title}</h3>
              <p className="text-gray-600 leading-relaxed mb-6">{recipe.description}</p>
              <div className="flex gap-3 items-center">
                <Link 
                  to={`/recipe/${recipe.id}`} 
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md text-center text-sm font-medium hover:bg-blue-700 transition-colors duration-200 no-underline"
                >
                  View Recipe
                </Link>
                <button 
                  onClick={() => handleRemoveFavorite(recipe.id)}
                  className="bg-red-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition-colors duration-200"
                  title="Remove from favorites"
                >
                  ❤️ Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesList;