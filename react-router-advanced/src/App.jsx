import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Link, Route, Routes } from 'react-router-dom'

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

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <nav style={{ display: 'flex', gap: 12 }}>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>
      <hr />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  )
}

export default App
