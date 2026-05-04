import styles from './Header.module.css'

export default function Header({ tab, setTab, ownedCount }) {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        Poké<span>Cards</span> Market
      </div>
      <nav className={styles.nav}>
        <button
          className={`${styles.tabBtn} ${tab === 'market' ? styles.active : ''}`}
          onClick={() => setTab('market')}
        >
          Mercado
        </button>
        <button
          className={`${styles.tabBtn} ${tab === 'mycards' ? styles.active : ''}`}
          onClick={() => setTab('mycards')}
        >
          Mi colección
          {ownedCount > 0 && (
            <span className={styles.badge}>{ownedCount}</span>
          )}
        </button>
      </nav>
    </header>
  )
}
