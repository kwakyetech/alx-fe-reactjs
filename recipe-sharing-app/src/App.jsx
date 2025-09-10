import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import RecipeList from './components/RecipeList'
import AddRecipeForm from './components/AddRecipeForm'
import RecipeDetails from './components/RecipeDetails'
import SearchBar from './components/SearchBar'
import FavoritesList from './components/FavoritesList'
import RecommendationsList from './components/RecommendationsList'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900 text-center py-6">Recipe Sharing Application</h1>
            <nav className="flex justify-center gap-6 pb-4 border-b border-gray-200">
              <Link 
                to="/" 
                className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors duration-200 font-medium"
              >
                🏠 Home
              </Link>
              <Link 
                to="/favorites" 
                className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors duration-200 font-medium"
              >
                ❤️ Favorites
              </Link>
              <Link 
                to="/recommendations" 
                className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors duration-200 font-medium"
              >
                ⭐ Recommendations
              </Link>
            </nav>
          </div>
        </header>
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={
              <>
                <AddRecipeForm />
                <SearchBar />
                <RecipeList />
              </>
            } />
            <Route path="/recipe/:id" element={<RecipeDetails />} />
            <Route path="/favorites" element={<FavoritesList />} />
            <Route path="/recommendations" element={<RecommendationsList />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
