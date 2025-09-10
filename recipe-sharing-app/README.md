# Recipe Sharing Application

A modern React application for sharing and managing recipes, built with Vite and powered by Zustand for state management.

## 🚀 Features

- **Add New Recipes**: Create recipes with title and description
- **View Recipe List**: Browse all your saved recipes in a clean, organized layout
- **State Management**: Powered by Zustand for efficient and simple state management
- **Responsive Design**: Clean and modern UI that works on all devices
- **Real-time Updates**: Instant recipe additions without page refresh

## 🛠️ Technologies Used

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and development server
- **Zustand** - Lightweight state management library
- **JavaScript (ES6+)** - Modern JavaScript features
- **CSS3** - Styling and responsive design

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
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

## 🎯 Usage

### Adding a Recipe
1. Fill in the "Recipe Title" field with your recipe name
2. Add a detailed description in the "Recipe Description" textarea
3. Click the "Add Recipe" button
4. Your recipe will instantly appear in the recipe list below

### Viewing Recipes
- All added recipes are displayed in the "Recipe List" section
- Each recipe shows its title and description in a styled card format
- If no recipes exist, a helpful message guides you to add your first recipe

## 🏗️ Project Structure

```
src/
├── components/
│   ├── AddRecipeForm.jsx    # Form component for adding new recipes
│   └── RecipeList.jsx       # Component for displaying recipe list
├── recipeStore.js           # Zustand store for recipe state management
├── App.jsx                  # Main application component
├── App.css                  # Application styles
├── index.css                # Global styles
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
  recipes: [],                    // Array of recipe objects
  addRecipe: (newRecipe) => {},   // Function to add a new recipe
  setRecipes: (recipes) => {}     // Function to set the entire recipe list
}));
```

## 🎨 Component Overview

### AddRecipeForm
- Handles recipe input with controlled components
- Validates form data before submission
- Resets form after successful submission
- Integrates with Zustand store for state updates

### RecipeList
- Displays all recipes from the Zustand store
- Shows empty state when no recipes exist
- Renders recipes in a clean, card-based layout
- Automatically updates when new recipes are added

## 🚀 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint for code quality

## 🔮 Future Enhancements

- [ ] Recipe editing and deletion functionality
- [ ] Recipe categories and tags
- [ ] Search and filter capabilities
- [ ] Recipe images upload
- [ ] User authentication
- [ ] Recipe sharing between users
- [ ] Ingredient lists and cooking instructions
- [ ] Recipe ratings and reviews

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
