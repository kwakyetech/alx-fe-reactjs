import { create } from 'zustand';
import { saveToLocalStorage, loadFromLocalStorage, STORAGE_KEYS } from '../utils/localStorage';

const useRecipeStore = create((set, get) => {
  // Load initial data from localStorage
  const initialRecipes = loadFromLocalStorage(STORAGE_KEYS.RECIPES, []);
  const initialFavorites = loadFromLocalStorage(STORAGE_KEYS.FAVORITES, []);
  const initialSearchTerm = loadFromLocalStorage(STORAGE_KEYS.SEARCH_TERM, '');
  
  return {
    recipes: initialRecipes,
    searchTerm: initialSearchTerm,
    filteredRecipes: initialSearchTerm 
      ? initialRecipes.filter(recipe =>
          recipe.title.toLowerCase().includes(initialSearchTerm.toLowerCase())
        )
      : initialRecipes,
    favorites: initialFavorites,
    recommendations: [],
  
    addRecipe: (newRecipe) => set((state) => {
      const updatedRecipes = [...state.recipes, newRecipe];
      // Save to localStorage
      saveToLocalStorage(STORAGE_KEYS.RECIPES, updatedRecipes);
      
      return {
        recipes: updatedRecipes,
        filteredRecipes: state.searchTerm 
          ? updatedRecipes.filter(recipe =>
              recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase())
            )
          : updatedRecipes
      };
    }),
  
    updateRecipe: (updatedRecipe) => set((state) => {
      const updatedRecipes = state.recipes.map(recipe => 
        recipe.id === updatedRecipe.id ? updatedRecipe : recipe
      );
      // Save to localStorage
      saveToLocalStorage(STORAGE_KEYS.RECIPES, updatedRecipes);
      
      return {
        recipes: updatedRecipes,
        filteredRecipes: state.searchTerm 
          ? updatedRecipes.filter(recipe =>
              recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase())
            )
          : updatedRecipes
      };
    }),
  
    deleteRecipe: (id) => set((state) => {
      const updatedRecipes = state.recipes.filter(recipe => recipe.id !== id);
      // Save to localStorage
      saveToLocalStorage(STORAGE_KEYS.RECIPES, updatedRecipes);
      
      // Also remove from favorites if it exists
      const updatedFavorites = state.favorites.filter(favId => favId !== id);
      saveToLocalStorage(STORAGE_KEYS.FAVORITES, updatedFavorites);
      
      return {
        recipes: updatedRecipes,
        favorites: updatedFavorites,
        filteredRecipes: state.searchTerm 
          ? updatedRecipes.filter(recipe =>
              recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase())
            )
          : updatedRecipes
      };
    }),
  
    setRecipes: (recipes) => set((state) => {
      // Save to localStorage
      saveToLocalStorage(STORAGE_KEYS.RECIPES, recipes);
      
      return {
        recipes,
        filteredRecipes: state.searchTerm 
          ? recipes.filter(recipe =>
              recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase())
            )
          : recipes
      };
    }),
  
    setSearchTerm: (term) => set((state) => {
      // Save search term to localStorage
      saveToLocalStorage(STORAGE_KEYS.SEARCH_TERM, term);
      
      const filteredRecipes = term 
        ? state.recipes.filter(recipe =>
            recipe.title.toLowerCase().includes(term.toLowerCase())
          )
        : state.recipes;
      return {
        searchTerm: term,
        filteredRecipes
      };
    }),
  
    filterRecipes: () => set((state) => ({
      filteredRecipes: state.searchTerm 
        ? state.recipes.filter(recipe =>
            recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase())
          )
        : state.recipes
    })),

    // Favorites functionality
    addFavorite: (recipeId) => set((state) => {
      const updatedFavorites = [...state.favorites, recipeId];
      // Save to localStorage
      saveToLocalStorage(STORAGE_KEYS.FAVORITES, updatedFavorites);
      
      return {
        favorites: updatedFavorites
      };
    }),

    removeFavorite: (recipeId) => set((state) => {
      const updatedFavorites = state.favorites.filter(id => id !== recipeId);
      // Save to localStorage
      saveToLocalStorage(STORAGE_KEYS.FAVORITES, updatedFavorites);
      
      return {
        favorites: updatedFavorites
      };
    }),

    // Recommendations functionality
    generateRecommendations: () => set((state) => {
      // Mock implementation based on favorites
      const recommended = state.recipes.filter(recipe =>
        state.favorites.includes(recipe.id) && Math.random() > 0.5
      );
      return { recommendations: recommended };
    })
  };
});

export default useRecipeStore;