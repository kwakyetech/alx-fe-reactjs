import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-8">
      <div className="flex space-x-8 mb-8">
        <a href="https://vite.dev" target="_blank" className="hover:scale-110 transition-transform">
          <img src={viteLogo} className="h-16 w-16" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" className="hover:scale-110 transition-transform">
          <img src={reactLogo} className="h-16 w-16 animate-spin" alt="React logo" />
        </a>
      </div>
      
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
        Vite + React + Tailwind CSS
      </h1>
      
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <button 
          onClick={() => setCount((count) => count + 1)}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 mb-4"
        >
          Count is {count}
        </button>
        <p className="text-gray-600 text-center mb-4">
          Edit <code className="bg-gray-100 px-2 py-1 rounded text-sm">src/App.jsx</code> and save to test HMR
        </p>
      </div>
      
      <p className="text-gray-500 text-center mt-8 max-w-md">
        Click on the Vite and React logos to learn more. This project now includes Tailwind CSS for styling!
      </p>
    </div>
  )
}

export default App
