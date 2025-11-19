import { useState } from 'react'

function TodoItem({ todo, toggleTodo, deleteTodo, editTodo }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)

  const handleEdit = () => {
    if (isEditing && editText.trim()) {
      editTodo(todo.id, editText)
      setIsEditing(false)
    } else {
      setIsEditing(true)
    }
  }

  const handleCancel = () => {
    setEditText(todo.text)
    setIsEditing(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleEdit()
    } else if (e.key === 'Escape') {
      handleCancel()
    }
  }

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
        className="todo-checkbox"
      />
      {isEditing ? (
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleEdit}
          onKeyDown={handleKeyDown}
          className="todo-edit-input"
          autoFocus
        />
      ) : (
        <span
          className="todo-text"
          onDoubleClick={handleEdit}
        >
          {todo.text}
        </span>
      )}
      <div className="todo-actions">
        {!isEditing && (
          <>
            <button
              onClick={handleEdit}
              className="todo-action-button edit-button"
              title="Edit todo"
            >
              ✏️
            </button>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="todo-action-button delete-button"
              title="Delete todo"
            >
              🗑️
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default TodoItem

