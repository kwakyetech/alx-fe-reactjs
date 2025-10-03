import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui';

const AddRecipeForm = () => {
  const navigate = useNavigate();
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    ingredients: '',
    steps: ''
  });
  
  // Validation state
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    // Check if title is empty
    if (!formData.title.trim()) {
      newErrors.title = 'Recipe title is required';
    }
    
    // Check if ingredients is empty
    if (!formData.ingredients.trim()) {
      newErrors.ingredients = 'Ingredients are required';
    } else {
      // Check if ingredients list has at least 2 items
      const ingredientsList = formData.ingredients.split('\n').filter(item => item.trim());
      if (ingredientsList.length < 2) {
        newErrors.ingredients = 'Please provide at least 2 ingredients (one per line)';
      }
    }
    
    // Check if preparation steps is empty
    if (!formData.steps.trim()) {
      newErrors.steps = 'Preparation steps are required';
    }
    
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Process ingredients and steps into arrays
      const ingredientsList = formData.ingredients.split('\n').filter(item => item.trim());
      const stepsList = formData.steps.split('\n').filter(item => item.trim());
      
      const newRecipe = {
        id: Date.now(), // Simple ID generation
        title: formData.title.trim(),
        summary: `Delicious ${formData.title.trim()} recipe`,
        image: '/src/assets/react.svg', // Default image
        ingredients: ingredientsList,
        instructions: stepsList
      };
      
      console.log('New recipe submitted:', newRecipe);
      
      // Reset form
      setFormData({
        title: '',
        ingredients: '',
        steps: ''
      });
      
      // Show success message (you could use a toast library here)
      alert('Recipe added successfully!');
      
      // Navigate back to home page
      navigate('/');
      
    } catch (error) {
      console.error('Error submitting recipe:', error);
      alert('Error adding recipe. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-2xl mx-auto mb-8">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
            Add New Recipe
          </h1>
          <p className="text-gray-600 text-center">
            Share your favorite recipe with the community
          </p>
        </div>

        {/* Form */}
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Recipe Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Recipe Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                  errors.title ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter recipe title..."
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title}</p>
              )}
            </div>

            {/* Ingredients */}
            <div>
              <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700 mb-2">
                Ingredients * <span className="text-gray-500">(one per line, minimum 2)</span>
              </label>
              <textarea
                id="ingredients"
                name="ingredients"
                value={formData.ingredients}
                onChange={handleChange}
                rows="6"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-vertical ${
                  errors.ingredients ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="2 cups flour&#10;1 cup sugar&#10;3 eggs&#10;1 tsp vanilla extract"
              />
              {errors.ingredients && (
                <p className="mt-1 text-sm text-red-600">{errors.ingredients}</p>
              )}
            </div>

            {/* Preparation Steps */}
            <div>
              <label htmlFor="steps" className="block text-sm font-medium text-gray-700 mb-2">
                Preparation Steps *
              </label>
              <textarea
                id="steps"
                name="steps"
                value={formData.steps}
                onChange={handleChange}
                rows="8"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-vertical ${
                  errors.steps ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="1. Preheat oven to 350°F&#10;2. Mix dry ingredients in a bowl&#10;3. Add wet ingredients and stir until combined&#10;4. Bake for 25-30 minutes"
              />
              {errors.steps && (
                <p className="mt-1 text-sm text-red-600">{errors.steps}</p>
              )}
            </div>

            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button
                type="button"
                variant="secondary"
                size="medium"
                onClick={() => navigate('/')}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="medium"
                disabled={isSubmitting}
                className="flex-1"
              >
                {isSubmitting ? 'Adding Recipe...' : 'Add Recipe'}
              </Button>
            </div>
          </form>
        </div>

        {/* Back to Home Link */}
        <div className="max-w-2xl mx-auto mt-6 text-center">
          <Button
            variant="link"
            size="medium"
            onClick={() => navigate('/')}
          >
            ← Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddRecipeForm;