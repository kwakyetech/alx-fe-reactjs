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
      <div className="recommendations-container">
        <h2 className="recommendations-title">Recommended for You</h2>
        <div className="no-recommendations">
          <p>No recommendations available yet.</p>
          <p>Add some recipes to your favorites to get personalized recommendations!</p>
          <button 
            onClick={generateRecommendations}
            className="generate-btn"
          >
            Generate Recommendations
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="recommendations-container">
      <div className="recommendations-header">
        <h2 className="recommendations-title">Recommended for You</h2>
        <button 
          onClick={generateRecommendations}
          className="refresh-btn"
          title="Refresh recommendations"
        >
          🔄 Refresh
        </button>
      </div>
      
      <div className="recommendations-grid">
        {recommendations.map(recipe => (
          <div key={recipe.id} className="recommendation-card">
            <div className="recommendation-badge">Recommended</div>
            <div className="recommendation-card-content">
              <h3 className="recommendation-recipe-title">{recipe.title}</h3>
              <p className="recommendation-recipe-description">{recipe.description}</p>
              <div className="recommendation-card-actions">
                <Link 
                  to={`/recipe/${recipe.id}`} 
                  className="view-recipe-btn"
                >
                  View Recipe
                </Link>
                <button 
                  onClick={() => handleToggleFavorite(recipe.id)}
                  className={`favorite-btn ${isRecipeFavorited(recipe.id) ? 'favorited' : ''}`}
                  title={isRecipeFavorited(recipe.id) ? 'Remove from favorites' : 'Add to favorites'}
                >
                  {isRecipeFavorited(recipe.id) ? '❤️' : '🤍'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .recommendations-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }

        .recommendations-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }

        .recommendations-title {
          font-size: 2rem;
          color: #333;
          margin: 0;
        }

        .refresh-btn {
          background: #28a745;
          color: white;
          border: none;
          padding: 10px 16px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.9rem;
          transition: background-color 0.2s ease;
        }

        .refresh-btn:hover {
          background: #218838;
        }

        .no-recommendations {
          text-align: center;
          padding: 60px 20px;
          background: #f8f9fa;
          border-radius: 12px;
          color: #666;
        }

        .no-recommendations p {
          margin: 10px 0;
          font-size: 1.1rem;
        }

        .generate-btn {
          background: #007bff;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 1rem;
          margin-top: 20px;
          transition: background-color 0.2s ease;
        }

        .generate-btn:hover {
          background: #0056b3;
        }

        .recommendations-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
        }

        .recommendation-card {
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          position: relative;
        }

        .recommendation-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15);
        }

        .recommendation-badge {
          position: absolute;
          top: 10px;
          right: 10px;
          background: #ff6b6b;
          color: white;
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 0.8rem;
          font-weight: 500;
          z-index: 1;
        }

        .recommendation-card-content {
          padding: 20px;
        }

        .recommendation-recipe-title {
          font-size: 1.3rem;
          color: #333;
          margin-bottom: 10px;
          font-weight: 600;
          padding-right: 80px; /* Space for badge */
        }

        .recommendation-recipe-description {
          color: #666;
          line-height: 1.5;
          margin-bottom: 20px;
        }

        .recommendation-card-actions {
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

        .favorite-btn {
          background: transparent;
          border: 2px solid #ddd;
          padding: 8px 12px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 1.2rem;
          transition: all 0.2s ease;
        }

        .favorite-btn:hover {
          border-color: #ff6b6b;
          background: #fff5f5;
        }

        .favorite-btn.favorited {
          border-color: #ff6b6b;
          background: #ff6b6b;
        }
      `}</style>
    </div>
  );
};

export default RecommendationsList;