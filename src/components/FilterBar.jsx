const FILTERS = [
  { key: 'all', label: 'Все' },
  { key: 'undone', label: 'Невыполненные' },
  { key: 'done', label: 'Выполненные' },
]

export default function FilterBar({ filter, search, onFilterChange, onSearchChange }) {
  return (
    <div className="filter-bar">
      <input
        type="text"
        className="filter-search"
        placeholder="Поиск по названию..."
        value={search}
        onChange={e => onSearchChange(e.target.value)}
      />
      <div className="filter-buttons">
        {FILTERS.map(f => (
          <button
            key={f.key}
            className={`filter-btn${filter === f.key ? ' active' : ''}`}
            onClick={() => onFilterChange(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>
    </div>
  )
}
