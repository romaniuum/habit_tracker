import { NavLink } from 'react-router-dom'

export default function NavBar({ doneCount, totalCount, theme, onToggleTheme }) {
  return (
    <nav className="navbar">
      <span className="navbar-title">Трекер привычек</span>
      <div className="navbar-right">
        <span className="navbar-stats" title="Выполнено / Всего">
          {doneCount}/{totalCount}
        </span>
        <NavLink
          to="/"
          end
          className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}
        >
          Привычки
        </NavLink>
        <NavLink
          to="/quotes"
          className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}
        >
          Цитаты
        </NavLink>
        <button
          className="btn-theme"
          onClick={onToggleTheme}
          title={theme === 'light' ? 'Тёмная тема' : 'Светлая тема'}
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </nav>
  )
}
