import React, { useState, useEffect } from 'react'

const Todo = () => {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [editIndex, setEditIndex] = useState(null)

  // Load todos from localStorage on component mount
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos'))
    if (storedTodos) {
      setTodos(storedTodos)
    }
  }, [])

  // Sync todos with localStorage
  const syncLocalStorage = (updatedTodos) => {
    localStorage.setItem('todos', JSON.stringify(updatedTodos))
  }

  // Add todo
  const handleAddTodo = () => {
    if (input.trim()) {
      const newTodos = [...todos, input]
      setTodos(newTodos)
      syncLocalStorage(newTodos)
      setInput('')
    }
  }

  // Edit todo
  const handleEditTodo = (index) => {
    setInput(todos[index])
    setIsEditing(true)
    setEditIndex(index)
  }

  // Save edited todo
  const handleSaveEdit = () => {
    if (editIndex !== null) {
      const updatedTodos = [...todos]
      updatedTodos[editIndex] = input
      setTodos(updatedTodos)
      syncLocalStorage(updatedTodos)
      setIsEditing(false)
      setEditIndex(null)
      setInput('')
    }
  }

  // Delete todo
  const handleDeleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index)
    setTodos(updatedTodos)
    syncLocalStorage(updatedTodos)
  }

  return (
    <div>
      <h1 className='text-2xl font-bold'>Todo Component</h1>
      <p className='text-gray-600 mb-4'>This is a simple Todo component.</p>
      <div className='mb-4'>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className='border p-2 rounded'
          type="text"
          placeholder="Add a new todo"
        />
        <button
          onClick={isEditing ? handleSaveEdit : handleAddTodo}
          className={`cursor-pointer ${isEditing ? 'bg-yellow-500' : 'bg-blue-500'} text-white p-2 rounded mx-2`}
        >
          {isEditing ? 'Save' : 'Add Todo'}
        </button>
      </div>
      <ul>
        {todos.length > 0 ? (
          todos.map((name, index) => (
            <li key={index} className='border-b p-2 flex items-center justify-between'>
              <span>{name}</span>
              <div>
                <button
                  onClick={() => handleEditTodo(index)}
                  className='cursor-pointer bg-green-500 text-white p-1 rounded mx-1'
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteTodo(index)}
                  className='cursor-pointer bg-red-500 text-white p-1 rounded mx-1'
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        ) : (
          <li className="text-gray-500">No todos yet!</li>
        )}
      </ul>
    </div>
  )
}

export default Todo