import { useState, createContext, useContext } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Link, Route, Routes, Navigate } from 'react-router-dom'
import Profile, { ProfileDetails, ProfileSettings } from './components/Profile.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import { AuthProvider } from './providers/AuthProvider.js'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import PostsList from './pages/PostsList.jsx'
import Post from './pages/Post.jsx'
import LoginPage from './pages/LoginPage.jsx'
import NotFound from './pages/NotFound.jsx'

function Home() {
  return (
    <div>
      <h2>Home</h2>
      <p>Welcome to the React Router Advanced demo.</p>
    </div>
  )
}

function About() {
  return (
    <div>
      <h2>About</h2>
      <p>This page demonstrates basic routing setup.</p>
    </div>
  )
}

// Auth context and hook
const AuthContext = createContext(null)
function useAuth() {
  return useContext(AuthContext)
}
function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const login = () => setIsAuthenticated(true)
  const logout = () => setIsAuthenticated(false)
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// Protected route wrapper
function ProtectedRoute({ children }) {
  const auth = useAuth()
  const location = useLocation()
  if (!auth?.isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }
  return children
}

// Profile layout with nested routes
function ProfileLayout() {
  return (
    <div>
      <h2>Profile</h2>
      <nav style={{ display: 'flex', gap: 12 }}>
        <Link to="details">Details</Link>
        <Link to="settings">Settings</Link>
      </nav>
      <hr />
      <Outlet />
    </div>
  )
}

function ProfileDetails() {
  return (
    <div>
      <h3>Profile Details</h3>
      <p>Name: Jane Doe</p>
      <p>Email: jane@example.com</p>
    </div>
  )
}

function ProfileSettings() {
  return (
    <div>
      <h3>Profile Settings</h3>
      <p>Notification: Enabled</p>
      <p>Theme: Light</p>
    </div>
  )
}

// Dynamic routing for posts
const samplePosts = [
  { id: '1', title: 'First Post', body: 'This is the first post.' },
  { id: '2', title: 'Second Post', body: 'This is the second post.' },
  { id: '3', title: 'Third Post', body: 'This is the third post.' },
]
function PostsList() {
  return (
    <div>
      <h2>Blog Posts</h2>
      <ul>
        {samplePosts.map((p) => (
          <li key={p.id}>
            <Link to={`/posts/${p.id}`}>{p.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
function Post() {
  const { postId } = useParams()
  const post = samplePosts.find((p) => p.id === postId)
  if (!post) {
    return (
      <div>
        <h3>Post not found</h3>
        <p>No post with id "{postId}"</p>
        <Link to="/posts">Back to posts</Link>
      </div>
    )
  }
  return (
    <article>
      <h3>{post.title}</h3>
      <p>{post.body}</p>
      <Link to="/posts">Back to posts</Link>
    </article>
  )
}

function LoginPage() {
  const auth = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'

  const handleLogin = () => {
    auth.login()
    navigate(from, { replace: true })
  }

  return (
    <div>
      <h2>Login</h2>
      <p>You must log in to view protected pages.</p>
      <button onClick={handleLogin}>Log in</button>
    </div>
  )
}

function NotFound() {
  return (
    <div>
      <h2>404 - Not Found</h2>
      <p>The page you are looking for does not exist.</p>
      <Link to="/">Go Home</Link>
    </div>
  )
}

function App() {
  return (
    <>
      <nav style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/posts">Posts</Link>
        <Link to="/profile">Profile</Link>
      </nav>
      <hr />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/posts" element={<PostsList />} />
        <Route path="/posts/:postId" element={<Post />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="details" replace />} />
          <Route path="details" element={<ProfileDetails />} />
          <Route path="settings" element={<ProfileSettings />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default function AppWithProviders() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  )
}
