import { useState } from 'react'
import HabitForm from './components/HabitForm'
import HabitList from './components/HabitList'
import FilterBar from './components/FilterBar'
import './App.css'

let nextId = 1

export default function App() {
  const [habits, setHabits] = useState([
    { id: nextId++, name: 'Выпить 2 литра воды', category: 'здоровье', completed: false },
    { id: nextId++, name: 'Пробежка 30 минут', category: 'спорт', completed: true },
    { id: nextId++, name: 'Читать 20 страниц', category: 'учёба', completed: false },
  ])
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')

  function addHabit(name, category) {
    setHabits(prev => [...prev, { id: nextId++, name, category, completed: false }])
  }

  function toggleHabit(id) {
    setHabits(prev =>
      prev.map(h => h.id === id ? { ...h, completed: !h.completed } : h)
    )
  }

  function deleteHabit(id) {
    setHabits(prev => prev.filter(h => h.id !== id))
  }

  function renameHabit(id, newName) {
    setHabits(prev =>
      prev.map(h => h.id === id ? { ...h, name: newName } : h)
    )
  }

  const filtered = habits.filter(h => {
    const matchesFilter =
      filter === 'all' ||
      (filter === 'done' && h.completed) ||
      (filter === 'undone' && !h.completed)
    const matchesSearch = h.name.toLowerCase().includes(search.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const doneCount = habits.filter(h => h.completed).length

  return (
    <div className="app">
      <header className="app-header">
        <h1>Трекер привычек</h1>
        <p className="subtitle">Формируй полезные привычки каждый день</p>
        <span className="counter-badge">
          Выполнено {doneCount} из {habits.length}
        </span>
      </header>

      <HabitForm onAdd={addHabit} />

      <FilterBar
        filter={filter}
        search={search}
        onFilterChange={setFilter}
        onSearchChange={setSearch}
      />

      <HabitList
        habits={filtered}
        onToggle={toggleHabit}
        onDelete={deleteHabit}
        onRename={renameHabit}
        totalCount={habits.length}
      />
    </div>
  )
}
