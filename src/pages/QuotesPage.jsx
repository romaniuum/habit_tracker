import { useState, useEffect } from 'react'

export default function QuotesPage() {
  const [quotes, setQuotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  function fetchQuotes() {
    setLoading(true)
    setError(null)
    const skip = Math.floor(Math.random() * 1441)
    fetch(`https://dummyjson.com/quotes?limit=10&skip=${skip}`)
      .then(res => {
        if (!res.ok) throw new Error('Сервер вернул ошибку')
        return res.json()
      })
      .then(data => {
        setQuotes(data.quotes)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchQuotes()
  }, [])

  return (
    <div className="app">
      <header className="app-header">
        <h1>Мотивационные цитаты</h1>
        <p className="subtitle">Вдохновляйся каждый день</p>
      </header>

      <div className="quotes-controls">
        <button className="btn-refresh" onClick={fetchQuotes} disabled={loading}>
          {loading ? 'Загрузка...' : '↻ Обновить'}
        </button>
      </div>

      {loading && (
        <div className="quotes-loading">
          <div className="spinner" />
          <p>Загрузка цитат...</p>
        </div>
      )}

      {error && !loading && (
        <div className="quotes-error">
          <p>Ошибка: {error}</p>
          <button className="btn-refresh" onClick={fetchQuotes}>
            Попробовать снова
          </button>
        </div>
      )}

      {!loading && !error && (
        <div className="quotes-list">
          {quotes.map(q => (
            <div key={q.id} className="quote-card">
              <p className="quote-text">"{q.quote}"</p>
              <p className="quote-author">— {q.author}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
