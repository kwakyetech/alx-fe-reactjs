# Recipe Sharing Application

A modern React application for sharing and managing recipes, built with Vite and powered by Zustand for state management.

## 🚀 Features

- **Add New Recipes**: Create recipes with title, ingredients, and cooking instructions
- **Recipe Management**: View, search, and filter recipes with real-time updates
- **Favorites System**: Mark recipes as favorites and view them in a dedicated section
- **Smart Recommendations**: Get personalized recipe suggestions based on your favorites
- **Advanced Search**: Search recipes by title with instant filtering
- **Routing & Navigation**: Multi-page application with React Router
- **State Management**: Powered by Zustand for efficient and simple state management
- **Modern UI**: Beautiful, responsive design with Tailwind CSS
- **Real-time Updates**: Instant recipe additions and updates without page refresh

## 🛠️ Technologies Used

- **React 18** - Modern React with hooks and concurrent features
- **Vite 7** - Ultra-fast build tool and development server
- **Zustand** - Lightweight state management library
- **React Router DOM** - Client-side routing and navigation
- **Tailwind CSS v4** - Utility-first CSS framework with Vite plugin
- **JavaScript (ES6+)** - Modern JavaScript features
- **Lucide React** - Beautiful icon library

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd recipe-sharing-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5174` (or the port shown in your terminal)

## 🎯 Usage

### Adding a Recipe
1. Navigate to the home page
2. Fill in the "Recipe Title" field with your recipe name
3. Add ingredients in the "Ingredients" textarea (one per line)
4. Add cooking instructions in the "Instructions" textarea
5. Click the "Add Recipe" button
6. Your recipe will instantly appear in the recipe list below

### Browsing Recipes
- **Home Page**: View all recipes with search functionality
- **Recipe Details**: Click "View Details" to see full recipe information
- **Search**: Use the search bar to filter recipes by title in real-time
- **Favorites**: Click the heart icon to add/remove recipes from favorites
- **Recommendations**: Get personalized suggestions based on your favorite recipes

### Navigation
- **Home**: Main page with all recipes and search
- **Favorites**: View only your favorite recipes
- **Recommendations**: Discover new recipes based on your preferences

## 🏗️ Project Structure

```
src/
├── components/
│   ├── AddRecipeForm.jsx    # Form component for adding new recipes
│   ├── RecipeList.jsx       # Component for displaying recipe list
│   ├── RecipeDetails.jsx    # Detailed view for individual recipes
│   ├── SearchBar.jsx        # Search functionality component
│   └── recipeStore.js       # Zustand store for recipe state management
├── App.jsx                  # Main application component with routing
├── App.css                  # Application styles
├── index.css                # Global styles with Tailwind CSS
└── main.jsx                 # Application entry point
```

## 🔧 State Management

This application uses **Zustand** for state management, providing:

- **Simple API**: Easy to understand and implement
- **No boilerplate**: Minimal setup required
- **TypeScript ready**: Full TypeScript support (when needed)
- **Devtools support**: Integration with Redux DevTools

### Store Structure

```javascript
const useRecipeStore = create((set) => ({
  recipes: [],                     // Array of recipe objects
  searchTerm: '',                  // Current search term
  filteredRecipes: [],             // Filtered recipes based on search
  favorites: [],                   // Array of favorite recipe IDs
  recommendations: [],             // Recommended recipes
  
  // Recipe management
  addRecipe: (newRecipe) => {},    // Add a new recipe
  updateRecipe: (id, updates) => {}, // Update existing recipe
  deleteRecipe: (id) => {},        // Delete a recipe
  setRecipes: (recipes) => {},     // Set the entire recipe list
  
  // Search functionality
  setSearchTerm: (term) => {},     // Update search term and filter
  
  // Favorites management
  addToFavorites: (id) => {},      // Add recipe to favorites
  removeFromFavorites: (id) => {}, // Remove recipe from favorites
  
  // Recommendations
  generateRecommendations: () => {} // Generate recipe recommendations
}));
```

## 🎨 Component Overview

### AddRecipeForm
- Handles recipe input with controlled components (title, ingredients, instructions)
- Validates form data before submission with proper error handling
- Resets form after successful submission
- Integrates with Zustand store for state updates
- Beautiful Tailwind CSS styling with responsive design

### RecipeList
- Displays filtered recipes from the Zustand store
- Shows empty state when no recipes exist
- Renders recipes in a clean, card-based layout with Tailwind CSS
- Includes favorite toggle functionality with heart icons
- "View Details" links for navigation to individual recipes
- Automatically updates when new recipes are added or search terms change

### SearchBar
- Real-time search functionality with instant filtering
- Clean, modern design with search icon
- Integrates with Zustand store for state management
- Responsive design that works on all devices

### RecipeDetails
- Detailed view of individual recipes with full information
- Displays title, ingredients list, and cooking instructions
- Navigation back to recipe list
- Responsive layout with Tailwind CSS styling

## 🚀 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint for code quality

## 🔮 Future Enhancements

- [ ] Recipe editing functionality in the UI
- [ ] Recipe deletion with confirmation dialogs
- [ ] Recipe categories and tags system
- [ ] Advanced filtering (by ingredients, cooking time, difficulty)
- [ ] Recipe images upload and display
- [ ] User authentication and profiles
- [ ] Recipe sharing between users
- [ ] Recipe ratings and reviews system
- [ ] Cooking timers and step-by-step mode
- [ ] Grocery list generation from recipes
- [ ] Nutritional information display
- [ ] Recipe import from URLs

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

Built with ❤️ using React, Vite, and Zustand

---

**Happy Cooking! 🍳**
