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
      <div className="favorites-container">
        <h2 className="favorites-title">My Favorites</h2>
        <div className="no-favorites">
          <p>You haven't added any favorites yet.</p>
          <p>Start exploring recipes and add them to your favorites!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="favorites-container">
      <h2 className="favorites-title">My Favorites</h2>
      <div className="favorites-grid">
        {favoriteRecipes.map(recipe => (
          <div key={recipe.id} className="favorite-card">
            <div className="favorite-card-content">
              <h3 className="favorite-recipe-title">{recipe.title}</h3>
              <p className="favorite-recipe-description">{recipe.description}</p>
              <div className="favorite-card-actions">
                <Link 
                  to={`/recipe/${recipe.id}`} 
                  className="view-recipe-btn"
                >
                  View Recipe
                </Link>
                <button 
                  onClick={() => handleRemoveFavorite(recipe.id)}
                  className="remove-favorite-btn"
                  title="Remove from favorites"
                >
                  ❤️ Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .favorites-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }

        .favorites-title {
          font-size: 2rem;
          color: #333;
          margin-bottom: 30px;
          text-align: center;
        }

        .no-favorites {
          text-align: center;
          padding: 60px 20px;
          background: #f8f9fa;
          border-radius: 12px;
          color: #666;
        }

        .no-favorites p {
          margin: 10px 0;
          font-size: 1.1rem;
        }

        .favorites-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
        }

        .favorite-card {
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .favorite-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15);
        }

        .favorite-card-content {
          padding: 20px;
        }

        .favorite-recipe-title {
          font-size: 1.3rem;
          color: #333;
          margin-bottom: 10px;
          font-weight: 600;
        }

        .favorite-recipe-description {
          color: #666;
          line-height: 1.5;
          margin-bottom: 20px;
        }

        .favorite-card-actions {
          display: flex;
          gap: 10px;
          align-items: center;
        }

        .view-recipe-btn {
          background: #007bff;
          color: white;
          padding: 8px 16px;
          border-radius: 6px;
          text-decoration: none;
          font-size: 0.9rem;
          transition: background-color 0.2s ease;
          flex: 1;
          text-align: center;
        }

        .view-recipe-btn:hover {
          background: #0056b3;
        }

        .remove-favorite-btn {
          background: #dc3545;
          color: white;
          border: none;
          padding: 8px 12px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.9rem;
          transition: background-color 0.2s ease;
        }

        .remove-favorite-btn:hover {
          background: #c82333;
        }
      `}</style>
    </div>
  );
};

export default FavoritesList;