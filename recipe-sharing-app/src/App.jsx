import './App.css'
import RecipeList from './components/RecipeList'
import AddRecipeForm from './components/AddRecipeForm'

function App() {
  return (
    <div className="App">
      <header>
        <h1>Recipe Sharing Application</h1>
      </header>
      <main style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
        <AddRecipeForm />
        <RecipeList />
      </main>
    </div>
  )
}

export default App
