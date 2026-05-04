import TypeBadge from './TypeBadge'
import styles from './MyCardsPage.module.css'

export default function MyCardsPage({ owned, pokemon }) {
  const cards = pokemon.filter(p => owned.has(p.id))
  const total = cards.reduce((s, p) => s + parseFloat(p.price), 0)

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Mi Colección</h1>
        <p className={styles.sub}>
          {cards.length === 0
            ? 'Aún no tienes cartas. ¡Ve al mercado y empieza a coleccionar!'
            : `${cards.length} carta${cards.length !== 1 ? 's' : ''} desbloqueada${cards.length !== 1 ? 's' : ''} · Total invertido: $${total.toFixed(2)} USD`
          }
        </p>
      </div>

      {cards.length === 0 ? (
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>📦</div>
          <h3>Colección vacía</h3>
          <p>Compra tu primera carta para empezar.</p>
        </div>
      ) : (
        <>
          {/* Summary cards */}
          <div className={styles.summaryGrid}>
            <div className={styles.summaryCard}>
              <span className={styles.summaryLabel}>Cartas obtenidas</span>
              <span className={styles.summaryVal}>{cards.length}</span>
            </div>
            <div className={styles.summaryCard}>
              <span className={styles.summaryLabel}>Total invertido</span>
              <span className={styles.summaryVal}>${total.toFixed(2)}</span>
            </div>
            <div className={styles.summaryCard}>
              <span className={styles.summaryLabel}>Carta más cara</span>
              <span className={styles.summaryVal} style={{textTransform:'capitalize'}}>
                {cards.sort((a,b) => parseFloat(b.price) - parseFloat(a.price))[0]?.name}
              </span>
            </div>
          </div>

          {/* Cards list */}
          <div className={styles.list}>
            {[...cards].sort((a, b) => a.id - b.id).map(p => (
              <div key={p.id} className={styles.card}>
                <img src={p.image} alt={p.name} className={styles.img} />
                <div className={styles.info}>
                  <div className={styles.cardName}>{p.name}</div>
                  <div className={styles.cardMeta}>
                    #{String(p.id).padStart(4, '0')} · HP {p.stats.hp} · Atk {p.stats.attack}
                  </div>
                  <div className={styles.badges}>
                    {p.types.map(t => <TypeBadge key={t} type={t} />)}
                  </div>
                </div>
                <div className={styles.right}>
                  <span className={styles.cardPrice}>${p.price}</span>
                  <span className={styles.ownedTag}>✓ Desbloqueada</span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
