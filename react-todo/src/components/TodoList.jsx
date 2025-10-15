import { useState } from 'react'

function AddTodoForm({ onAdd }) {
  const [text, setText] = useState('')
  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = text.trim()
    if (!trimmed) return
    onAdd(trimmed)
    setText('')
  }
  return (
    <form onSubmit={handleSubmit} aria-label="add-todo-form">
      <input
        aria-label="new-todo-input"
        placeholder="Add a todo"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  )
}

export default function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Build Todo App', completed: true },
    { id: 3, text: 'Write Tests', completed: false },
  ])

  const addTodo = (text) => {
    setTodos((prev) => [
      ...prev,
      { id: prev.length ? Math.max(...prev.map((t) => t.id)) + 1 : 1, text, completed: false },
    ])
  }

  const toggleTodo = (id) => {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)))
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <div>
      <AddTodoForm onAdd={addTodo} />
      <ul aria-label="todo-list">
        {todos.map((t) => (
          <li key={t.id}>
            <span
              role="button"
              aria-label={`todo-${t.id}`}
              onClick={() => toggleTodo(t.id)}
              style={{
                cursor: 'pointer',
                textDecoration: t.completed ? 'line-through' : 'none',
              }}
            >
              {t.text}
            </span>
            <button aria-label={`delete-${t.id}`} onClick={() => deleteTodo(t.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}