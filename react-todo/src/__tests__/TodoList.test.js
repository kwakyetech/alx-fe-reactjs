import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import TodoList from '../components/TodoList'

describe('TodoList', () => {
  test('renders initial todos', () => {
    render(<TodoList />)
    const list = screen.getByLabelText('todo-list')
    expect(list).toBeInTheDocument()
    // initial items
    expect(screen.getByLabelText('todo-1')).toHaveTextContent('Learn React')
    expect(screen.getByLabelText('todo-2')).toHaveTextContent('Build Todo App')
    expect(screen.getByLabelText('todo-3')).toHaveTextContent('Write Tests')
  })

  test('adds a new todo', () => {
    render(<TodoList />)
    const input = screen.getByLabelText('new-todo-input')
    const form = screen.getByLabelText('add-todo-form')
    fireEvent.change(input, { target: { value: 'New Task' } })
    fireEvent.submit(form)
    expect(screen.getByText('New Task')).toBeInTheDocument()
  })

  test('toggles a todo completed state when clicked', () => {
    render(<TodoList />)
    const todoItem = screen.getByLabelText('todo-1')
    // Initially not completed (no line-through)
    expect(todoItem).toHaveStyle({ textDecoration: 'none' })
    fireEvent.click(todoItem)
    expect(todoItem).toHaveStyle({ textDecoration: 'line-through' })
    fireEvent.click(todoItem)
    expect(todoItem).toHaveStyle({ textDecoration: 'none' })
  })

  test('deletes a todo', () => {
    render(<TodoList />)
    const deleteBtn = screen.getByLabelText('delete-2')
    fireEvent.click(deleteBtn)
    expect(screen.queryByText('Build Todo App')).not.toBeInTheDocument()
  })
})