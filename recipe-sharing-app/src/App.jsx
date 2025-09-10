import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import RecipeList from './components/RecipeList'
import AddRecipeForm from './components/AddRecipeForm'
import RecipeDetails from './components/RecipeDetails'

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <h1>Recipe Sharing Application</h1>
        </header>
        <main style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
          <Routes>
            <Route path="/" element={
              <>
                <AddRecipeForm />
                <RecipeList />
              </>
            } />
            <Route path="/recipe/:id" element={<RecipeDetails />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
