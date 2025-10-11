import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import RegistrationForm from './components/RegistrationForm'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-8">
      
      
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
        Form Handling with React
      </h1>
      
      <RegistrationForm />
      
    </div>
  )
}

export default App
