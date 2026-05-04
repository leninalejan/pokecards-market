import { useState } from 'react'
import PokeCard from './PokeCard'
import styles from './MarketPage.module.css'

export default function MarketPage({ pokemon, owned, onBuy }) {
  const [filter, setFilter] = useState('all')

  const allTypes = [...new Set(pokemon.flatMap(p => p.types))].sort()
  const filtered = filter === 'all' ? pokemon : pokemon.filter(p => p.types.includes(filter))

  const ownedCount = owned.size
  const total = pokemon.reduce((s, p) => s + parseFloat(p.price), 0)

  return (
    <div className={styles.page}>
      {/* Hero */}
      <div className={styles.hero}>
        <h1 className={styles.heroTitle}>
          Colecciona. Compra. <em>Domina.</em>
        </h1>
        <p className={styles.heroSub}>
          {pokemon.length} cartas únicas inspiradas en el mundo Pokémon.
          Cada una con precio según su tipo y rareza.
        </p>
      </div>

      {/* Stats bar */}
      {pokemon.length > 0 && (
        <div className={styles.statsBar}>
          <div className={styles.chip}>
            Total: <span>{pokemon.length}</span> cartas
          </div>
          <div className={styles.chip}>
            Obtenidas: <span>{ownedCount}</span>
          </div>
          <div className={styles.chip}>
            Disponibles: <span>{pokemon.length - ownedCount}</span>
          </div>
          {ownedCount > 0 && (
            <div className={styles.chip}>
              Invertido: <span>
                ${pokemon
                  .filter(p => owned.has(p.id))
                  .reduce((s, p) => s + parseFloat(p.price), 0)
                  .toFixed(2)}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Filtros */}
      {pokemon.length > 0 && (
        <div className={styles.filters}>
          <button
            className={`${styles.pill} ${filter === 'all' ? styles.active : ''}`}
            onClick={() => setFilter('all')}
          >
            Todos ({pokemon.length})
          </button>
          {allTypes.map(t => (
            <button
              key={t}
              className={`${styles.pill} ${filter === t ? styles.active : ''}`}
              onClick={() => setFilter(t)}
            >
              {t} ({pokemon.filter(p => p.types.includes(t)).length})
            </button>
          ))}
        </div>
      )}

      {/* Grid */}
      <div className={styles.grid}>
        {filtered.map(p => (
          <PokeCard
            key={p.id}
            pokemon={p}
            owned={owned.has(p.id)}
            onBuy={onBuy}
          />
        ))}
      </div>

      {filtered.length === 0 && pokemon.length > 0 && (
        <div className={styles.empty}>
          <p>No hay cartas con tipo <strong>{filter}</strong>.</p>
          <button className={styles.resetBtn} onClick={() => setFilter('all')}>
            Ver todas
          </button>
        </div>
      )}
    </div>
  )
}
