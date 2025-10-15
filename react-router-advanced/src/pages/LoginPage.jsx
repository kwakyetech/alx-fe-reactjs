import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../providers/AuthProvider.jsx'

export default function LoginPage() {
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