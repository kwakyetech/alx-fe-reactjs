import './App.css'
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
      <div className="App">
        <header>
          <h1>Recipe Sharing Application</h1>
          <nav style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '20px', 
            marginTop: '20px',
            padding: '10px 0',
            borderBottom: '1px solid #eee'
          }}>
            <Link 
              to="/" 
              style={{
                textDecoration: 'none',
                color: '#007bff',
                padding: '8px 16px',
                borderRadius: '4px',
                transition: 'background-color 0.2s ease'
              }}
            >
              🏠 Home
            </Link>
            <Link 
              to="/favorites" 
              style={{
                textDecoration: 'none',
                color: '#007bff',
                padding: '8px 16px',
                borderRadius: '4px',
                transition: 'background-color 0.2s ease'
              }}
            >
              ❤️ Favorites
            </Link>
            <Link 
              to="/recommendations" 
              style={{
                textDecoration: 'none',
                color: '#007bff',
                padding: '8px 16px',
                borderRadius: '4px',
                transition: 'background-color 0.2s ease'
              }}
            >
              ⭐ Recommendations
            </Link>
          </nav>
        </header>
        <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
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
