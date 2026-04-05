import HabitItem from './HabitItem'

export default function HabitList({ habits, onToggle, onDelete, onRename, totalCount }) {
  if (totalCount === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📋</div>
        <p>Добавьте первую привычку</p>
        <span>Заполните форму выше, чтобы начать отслеживать привычки</span>
      </div>
    )
  }

  if (habits.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">🔍</div>
        <p>Ничего не найдено</p>
        <span>Попробуйте изменить фильтр или поисковый запрос</span>
      </div>
    )
  }

  return (
    <div className="habit-list">
      {habits.map(habit => (
        <HabitItem
          key={habit.id}
          habit={habit}
          onToggle={onToggle}
          onDelete={onDelete}
          onRename={onRename}
        />
      ))}
    </div>
  )
}
