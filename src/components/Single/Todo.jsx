import React, { useState, useEffect } from 'react'

const Todo = () => {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  //add todo in local storage
  const handleAddTodo = () => {
    if (input.trim()) {
      setTodos([...todos, input])
      setInput('')
      localStorage.setItem('todos', JSON.stringify([...todos, input]))
    }
  }

  //on component mount
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos'))
    if (storedTodos) {
      setTodos(storedTodos)
    }
  }, [])

  //delete todo
  const handleDeleteTodo = (index) => {
    const newTodos = todos.filter((item, i) => i !== index)
    setTodos(newTodos)
    localStorage.setItem('todos', JSON.stringify(newTodos))
  }

  //edit todo
  const handleEditTodo = (index) => {
    setInput(todos[index]);
    setIsEditing(true);
    setEditIndex(index);
  }

  //handle save edit
  const handleSaveEdit = () => {
    if (editIndex) {
      const newTodo = [...todos]
      newTodo[editIndex] = input
      setTodos(newTodo)
      localStorage.setItem('todos', JSON.stringify(newTodo))

      setIsEditing(false);
      setEditIndex(null);
      setInput('');
    }
  }

  return (
    <div>
      <h1 className='text-2xl font-bold'>Todo Component</h1>
      <p className='text-gray-600'>This is a simple Todo component.</p>
      <input value={input} onChange={(e) => setInput(e.target.value)} className='border p-2 rounded' type="text" placeholder="Add a new todo" />
      {!isEditing && (<button onClick={handleAddTodo} className='cursor-pointer bg-blue-500 text-white p-2 rounded mx-2'>Add Todo</button>)}
      {isEditing && (<button onClick={handleSaveEdit} className='cursor-pointer bg-yellow-500 text-white p-2 rounded mx-2'>Save</button>)}
      <ul>
        {todos.map((name, index) => (
          <li key={index} className='border-b p-2'>{name}
            <button onClick={() => handleEditTodo(index)} className='cursor-pointer bg-green-500 text-white p-1 rounded ml-2'>Edit</button>
            <button onClick={() => handleDeleteTodo(index)} className='cursor-pointer bg-red-500 text-white p-1 rounded ml-2'>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Todo