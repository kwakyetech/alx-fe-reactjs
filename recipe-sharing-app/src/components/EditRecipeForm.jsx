import React, { useState } from 'react';
import useRecipeStore from './recipeStore';

const EditRecipeForm = ({ recipe, onCancel, onSave }) => {
  const [title, setTitle] = useState(recipe.title);
  const [description, setDescription] = useState(recipe.description);
  const [errors, setErrors] = useState({});
  const updateRecipe = useRecipeStore(state => state.updateRecipe);

  const validateForm = () => {
    const newErrors = {};
    
    if (!title.trim()) {
      newErrors.title = 'Recipe title is required';
    }
    
    if (!description.trim()) {
      newErrors.description = 'Recipe description is required';
    } else if (description.trim().length < 10) {
      newErrors.description = 'Description must be at least 10 characters long';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (validateForm()) {
      const updatedRecipe = {
        ...recipe,
        title: title.trim(),
        description: description.trim()
      };
      
      updateRecipe(updatedRecipe);
      onSave();
    }
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg border border-gray-300">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Edit Recipe</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
            Recipe Title:
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`w-full px-4 py-3 rounded-md text-base transition-colors duration-200 ${
              errors.title 
                ? 'border-2 border-red-500 focus:ring-2 focus:ring-red-500 focus:border-red-500' 
                : 'border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
            }`}
            placeholder="Enter recipe title"
          />
          {errors.title && (
            <span className="text-red-500 text-sm mt-2 block">
              {errors.title}
            </span>
          )}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
            Description:
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            className={`w-full px-4 py-3 rounded-md text-base resize-vertical transition-colors duration-200 ${
              errors.description 
                ? 'border-2 border-red-500 focus:ring-2 focus:ring-red-500 focus:border-red-500' 
                : 'border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
            }`}
            placeholder="Enter recipe description"
          />
          {errors.description && (
            <span className="text-red-500 text-sm mt-2 block">
              {errors.description}
            </span>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="submit"
            className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200 text-base font-medium"
          >
            Save Changes
          </button>
          
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200 text-base font-medium"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditRecipeForm;