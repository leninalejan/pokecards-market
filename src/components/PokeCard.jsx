import TypeBadge from './TypeBadge'
import styles from './PokeCard.module.css'

export default function PokeCard({ pokemon, owned, onBuy }) {
  function handleBuy(e) {
    e.stopPropagation()
    if (!owned) onBuy(pokemon)
  }

  return (
    <article
      className={`${styles.card} ${owned ? styles.owned : ''}`}
      onClick={() => !owned && onBuy(pokemon)}
      title={owned ? `${pokemon.name} — ya en tu colección` : `Comprar a $${pokemon.price}`}
    >
      <span className={styles.cardNumber}>
        #{String(pokemon.id).padStart(4, '0')}
      </span>

      {owned && (
        <span className={styles.ownedBadge}>✓ Obtenida</span>
      )}

      <div className={styles.imgWrap}>
        <img
          src={pokemon.image}
          alt={pokemon.name}
          loading="lazy"
          className={styles.img}
        />
      </div>

      <h3 className={styles.name}>{pokemon.name}</h3>

      <div className={styles.types}>
        {pokemon.types.map(t => (
          <TypeBadge key={t} type={t} />
        ))}
      </div>

      <p className={styles.price}>${pokemon.price}</p>

      {owned ? (
        <button className={`${styles.btn} ${styles.ownedBtn}`} disabled>
          ✓ En tu colección
        </button>
      ) : (
        <button className={styles.btn} onClick={handleBuy}>
          🛒 Comprar carta
        </button>
      )}
    </article>
  )
}
