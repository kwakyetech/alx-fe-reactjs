import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '../ui';
import recipeData from '../data.json';

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Find recipe by ID
    const foundRecipe = recipeData.find(recipe => recipe.id === parseInt(id));
    setRecipe(foundRecipe);
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="text-xl">Loading recipe...</div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="text-xl text-red-600 mb-4">Recipe not found</div>
        <Link to="/">
          <Button variant="primary" size="medium">
            Back to Home
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back to Home Button */}
      <Link to="/">
        <Button variant="link" size="medium">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Recipes
        </Button>
      </Link>

      {/* Recipe Header */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8 max-w-6xl mx-auto">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover"
        />
        <div className="p-4 sm:p-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            {recipe.title}
          </h1>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
            {recipe.summary}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8 max-w-7xl mx-auto">
        {/* Ingredients Section */}
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Ingredients
          </h2>
          <ul className="space-y-2">
            {recipe.ingredients.map((ingredient, index) => (
              <li 
                key={index} 
                className="flex items-start text-gray-700 hover:bg-gray-50 p-2 rounded transition-colors duration-150"
              >
                <span className="text-green-600 mr-3 mt-1">•</span>
                <span className="text-sm sm:text-base">{ingredient}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Instructions Section */}
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Instructions
          </h2>
          <ol className="space-y-4">
            {recipe.instructions.map((instruction, index) => (
              <li 
                key={index} 
                className="flex items-start text-gray-700 hover:bg-gray-50 p-3 rounded transition-colors duration-150"
              >
                <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-4 mt-0.5 flex-shrink-0">
                  {index + 1}
                </span>
                <span className="leading-relaxed text-sm sm:text-base">{instruction}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="mt-8 text-center max-w-7xl mx-auto">
        <Link to="/">
          <Button variant="primary" size="large">
            Explore More Recipes
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default RecipeDetail;