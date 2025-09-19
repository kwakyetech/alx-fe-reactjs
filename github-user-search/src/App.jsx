import { useState } from 'react'
import Search from './components/Search'
import UserProfile from './components/UserProfile'
import { fetchUserData } from './services/githubService'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSearch = async (username) => {
    setLoading(true)
    setError(null)
    setUser(null)

    try {
      const userData = await fetchUserData(username)
      setUser(userData)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <header className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-4 sm:p-6 md:p-8 text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">GitHub User Search</h1>
        <p className="text-sm sm:text-base md:text-lg opacity-90">Search for GitHub users and view their profiles</p>
      </header>
      
      <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-4xl mx-auto w-full">
        <Search onSearch={handleSearch} />
        <UserProfile user={user} loading={loading} error={error} />
      </main>
      
      <footer className="bg-gray-50 p-3 sm:p-4 text-center text-gray-600 border-t border-gray-200">
        <p className="text-sm">Built with React and GitHub API</p>
      </footer>
    </div>
  )
}

export default App
