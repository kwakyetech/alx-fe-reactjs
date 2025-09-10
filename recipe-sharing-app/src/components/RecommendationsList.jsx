import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useRecipeStore from './recipeStore';

const RecommendationsList = () => {
  const recommendations = useRecipeStore(state => state.recommendations);
  const favorites = useRecipeStore(state => state.favorites);
  const addFavorite = useRecipeStore(state => state.addFavorite);
  const removeFavorite = useRecipeStore(state => state.removeFavorite);
  const generateRecommendations = useRecipeStore(state => state.generateRecommendations);

  // Generate recommendations when component mounts or favorites change
  useEffect(() => {
    generateRecommendations();
  }, [favorites.length, generateRecommendations]);

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

  if (recommendations.length === 0) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Recommended for You</h2>
        <div className="text-center py-16 px-6 bg-gray-50 rounded-xl">
          <p className="text-lg text-gray-600 mb-3">No recommendations available yet.</p>
          <p className="text-lg text-gray-600 mb-6">Add some recipes to your favorites to get personalized recommendations!</p>
          <button 
            onClick={generateRecommendations}
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium"
          >
            Generate Recommendations
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Recommended for You</h2>
        <button 
          onClick={generateRecommendations}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200 text-sm font-medium"
          title="Refresh recommendations"
        >
          🔄 Refresh
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendations.map(recipe => (
          <div key={recipe.id} className="relative bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-1 overflow-hidden">
            <div className="absolute top-3 right-3 bg-red-400 text-white px-2 py-1 rounded-full text-xs font-medium z-10">
              Recommended
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3 pr-20">{recipe.title}</h3>
              <p className="text-gray-600 leading-relaxed mb-6">{recipe.description}</p>
              <div className="flex gap-3 items-center">
                <Link 
                  to={`/recipe/${recipe.id}`} 
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md text-center text-sm font-medium hover:bg-blue-700 transition-colors duration-200 no-underline"
                >
                  View Recipe
                </Link>
                <button 
                  onClick={() => handleToggleFavorite(recipe.id)}
                  className={`px-3 py-2 rounded-md border-2 text-lg transition-all duration-200 ${
                    isRecipeFavorited(recipe.id) 
                      ? 'border-red-400 bg-red-400 text-white' 
                      : 'border-gray-300 bg-transparent hover:border-red-400 hover:bg-red-50'
                  }`}
                  title={isRecipeFavorited(recipe.id) ? 'Remove from favorites' : 'Add to favorites'}
                >
                  {isRecipeFavorited(recipe.id) ? '❤️' : '🤍'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>


    </div>
  );
};

export default RecommendationsList;