import { useState } from 'react'

const CATEGORIES = ['здоровье', 'спорт', 'учёба', 'другое']

export default function HabitForm({ onAdd }) {
  const [name, setName] = useState('')
  const [category, setCategory] = useState('здоровье')

  function handleSubmit(e) {
    e.preventDefault()
    const trimmed = name.trim()
    if (!trimmed) return
    onAdd(trimmed, category)
    setName('')
    setCategory('здоровье')
  }

  return (
    <form className="habit-form" onSubmit={handleSubmit}>
      <h2>Новая привычка</h2>
      <div className="form-row">
        <input
          type="text"
          placeholder="Название привычки..."
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <select value={category} onChange={e => setCategory(e.target.value)}>
          {CATEGORIES.map(cat => (
            <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
          ))}
        </select>
        <button type="submit" className="btn-add">Добавить</button>
      </div>
    </form>
  )
}
