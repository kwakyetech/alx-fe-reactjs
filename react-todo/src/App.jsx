import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TodoList from './components/TodoList'
import Testing from './components/Testing'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>React Todo</h1>
      <TodoList />
      <Testing />
    </>
  )
}

export default App
