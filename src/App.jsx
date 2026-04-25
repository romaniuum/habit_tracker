import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import HabitsPage from './pages/HabitsPage'
import QuotesPage from './pages/QuotesPage'
import './App.css'

let nextId = 1

function getInitialHabits() {
  try {
    const stored = localStorage.getItem('habits')
    if (stored) {
      const parsed = JSON.parse(stored)
      if (parsed.length > 0) {
        nextId = Math.max(...parsed.map(h => h.id)) + 1
      }
      return parsed
    }
  } catch {}
  return [
    { id: nextId++, name: 'Выпить 2 литра воды', category: 'здоровье', completed: false },
    { id: nextId++, name: 'Пробежка 30 минут', category: 'спорт', completed: true },
    { id: nextId++, name: 'Читать 20 страниц', category: 'учёба', completed: false },
  ]
}

export default function App() {
  const [habits, setHabits] = useState(getInitialHabits)
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light')

  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits))
  }, [habits])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  function toggleTheme() {
    setTheme(t => (t === 'light' ? 'dark' : 'light'))
  }

  function addHabit(name, category) {
    setHabits(prev => [...prev, { id: nextId++, name, category, completed: false }])
  }

  function toggleHabit(id) {
    setHabits(prev =>
      prev.map(h => (h.id === id ? { ...h, completed: !h.completed } : h))
    )
  }

  function deleteHabit(id) {
    setHabits(prev => prev.filter(h => h.id !== id))
  }

  function renameHabit(id, newName) {
    setHabits(prev =>
      prev.map(h => (h.id === id ? { ...h, name: newName } : h))
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
    <>
      <NavBar
        doneCount={doneCount}
        totalCount={habits.length}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
      <Routes>
        <Route
          path="/"
          element={
            <HabitsPage
              habits={filtered}
              filter={filter}
              search={search}
              onAdd={addHabit}
              onToggle={toggleHabit}
              onDelete={deleteHabit}
              onRename={renameHabit}
              onFilterChange={setFilter}
              onSearchChange={setSearch}
              doneCount={doneCount}
              totalCount={habits.length}
            />
          }
        />
        <Route path="/quotes" element={<QuotesPage />} />
      </Routes>
    </>
  )
}
