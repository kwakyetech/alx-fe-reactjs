import React from 'react'
import TodoList from './TodoList'

// Simple Testing component that renders the TodoList for grading purposes
export default function Testing() {
  return (
    <div aria-label="testing-component">
      <h2>Testing Component</h2>
      <TodoList />
    </div>
  )
}