import HabitForm from '../components/HabitForm'
import HabitList from '../components/HabitList'
import FilterBar from '../components/FilterBar'

export default function HabitsPage({
  habits,
  filter,
  search,
  onAdd,
  onToggle,
  onDelete,
  onRename,
  onFilterChange,
  onSearchChange,
  doneCount,
  totalCount,
}) {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Трекер привычек</h1>
        <p className="subtitle">Формируй полезные привычки каждый день</p>
        <span className="counter-badge">
          Выполнено {doneCount} из {totalCount}
        </span>
      </header>

      <HabitForm onAdd={onAdd} />

      <FilterBar
        filter={filter}
        search={search}
        onFilterChange={onFilterChange}
        onSearchChange={onSearchChange}
      />

      <HabitList
        habits={habits}
        onToggle={onToggle}
        onDelete={onDelete}
        onRename={onRename}
        totalCount={totalCount}
      />
    </div>
  )
}
