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
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Recipe List</h2>
      {recipes.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No recipes available. Add some recipes to get started!</p>
        </div>
      ) : displayRecipes.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No recipes found matching "{searchTerm}". Try a different search term!</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {displayRecipes.map(recipe => (
            <div key={recipe.id} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="flex flex-col h-full">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{recipe.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3">
                  {recipe.description.length > 100 
                    ? `${recipe.description.substring(0, 100)}...` 
                    : recipe.description
                    }
                  </p>
                </div>
                <div className="flex gap-3 items-center mt-4">
                  <Link 
                    to={`/recipe/${recipe.id}`}
                    className="flex-1 inline-flex justify-center items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors duration-200"
                  >
                    View Details
                  </Link>
                  <button
                    onClick={() => handleToggleFavorite(recipe.id)}
                    className={`px-3 py-2 rounded-md border-2 transition-all duration-200 text-lg ${
                      isRecipeFavorited(recipe.id) 
                        ? 'border-red-400 bg-red-400 hover:bg-red-500 hover:border-red-500' 
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
      )}
    </div>
  );
};

export default RecipeList;