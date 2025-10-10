import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui';
import recipeData from '../data.json';

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    // Load recipe data when component mounts
    setRecipes(recipeData);
  }, []);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-6 sm:mb-8 text-gray-800">
        Recipe Sharing Platform
      </h1>
      
      {/* Add Recipe Button */}
      <div className="text-center mb-6 sm:mb-8">
        <Link to="/add-recipe">
          <Button variant="primary" size="medium" className="w-full sm:w-auto">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            Add New Recipe
          </Button>
        </Link>
      </div>
      
      {/* Responsive grid layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:scale-105"
          >
            {/* Recipe Image */}
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-40 sm:h-48 object-cover"
            />
            
            {/* Recipe Content */}
            <div className="p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-gray-800">
                {recipe.title}
              </h2>
              <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 line-clamp-3">
                {recipe.summary}
              </p>
              
              {/* View Recipe Button with Link */}
              <Link to={`/recipe/${recipe.id}`}>
                <Button variant="primary" size="medium" className="w-full text-sm sm:text-base">
                  View Recipe
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;