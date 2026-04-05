import { useState } from 'react'

export default function HabitItem({ habit, onToggle, onDelete, onRename }) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(habit.name)

  function handleDoubleClick() {
    setDraft(habit.name)
    setEditing(true)
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') commitEdit()
    if (e.key === 'Escape') setEditing(false)
  }

  function commitEdit() {
    const trimmed = draft.trim()
    if (trimmed && trimmed !== habit.name) {
      onRename(habit.id, trimmed)
    }
    setEditing(false)
  }

  return (
    <div className={`habit-item${habit.completed ? ' completed' : ''}`}>
      <input
        type="checkbox"
        className="habit-checkbox"
        checked={habit.completed}
        onChange={() => onToggle(habit.id)}
      />

      <div className="habit-content">
        {editing ? (
          <input
            autoFocus
            className="habit-name-input"
            value={draft}
            onChange={e => setDraft(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={commitEdit}
          />
        ) : (
          <div
            className="habit-name"
            onDoubleClick={handleDoubleClick}
            title="Двойной клик для редактирования"
          >
            {habit.name}
          </div>
        )}
        <div className="habit-category">
          <span className={`category-badge ${habit.category}`}>
            {habit.category}
          </span>
        </div>
      </div>

      <div className="habit-actions">
        <button
          className="btn-icon btn-edit"
          onClick={handleDoubleClick}
          title="Редактировать"
        >
          ✏️
        </button>
        <button
          className="btn-icon btn-delete"
          onClick={() => onDelete(habit.id)}
          title="Удалить"
        >
          🗑️
        </button>
      </div>
    </div>
  )
}
