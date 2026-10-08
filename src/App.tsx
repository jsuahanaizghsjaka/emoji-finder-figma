import { useMemo, useState } from 'react'
import './App.css'

type Emoji = { symbol: string; name: string; description: string }

const emojis: Emoji[] = [
  { symbol: '💯', name: '100', description: 'Hundred, points, symbol, wow, win, perfect, parties' },
  { symbol: '🔢', name: '1234', description: 'input symbol for numbers symbol' },
  { symbol: '🔢', name: '1234', description: 'input symbol for numbers symbol' },
]

function App() {
  const [query, setQuery] = useState('')
  const filteredEmojis = useMemo(() => {
    const search = query.trim().toLowerCase()
    return search
      ? emojis.filter(({ name, description }) =>
          `${name} ${description}`.toLowerCase().includes(search),
        )
      : emojis
  }, [query])

  return (
    <main className="page" id="main-content">
      <header className="hero">
        <div className="hero__content">
          <h1>Emoji Finder</h1>
          <p>Find emoji by keywords</p>
        </div>
      </header>
      <section className="catalog" aria-label="Emoji search results">
        <div className="catalog__inner">
          <label className="sr-only" htmlFor="emoji-search">Search emoji by keyword</label>
          <input
            id="emoji-search"
            className="search"
            name="emoji"
            type="search"
            placeholder="Placeholder"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            autoComplete="off"
          />
          {filteredEmojis.length > 0 ? (
            <div className="emoji-grid">
              {filteredEmojis.map((emoji, index) => (
                <article className="emoji-card" key={`${emoji.name}-${index}`}>
                  <span className="emoji-card__symbol" aria-hidden="true">{emoji.symbol}</span>
                  <h2>{emoji.name}</h2>
                  <p>{emoji.description}</p>
                </article>
              ))}
            </div>
          ) : (
            <p className="empty-state" role="status">No emoji found for “{query}”.</p>
          )}
        </div>
      </section>
    </main>
  )
}

export default App
