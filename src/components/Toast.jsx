import styles from './Toast.module.css'

export default function Toast({ toasts }) {
  if (toasts.length === 0) return null

  return (
    <div className={styles.wrap} aria-live="polite">
      {toasts.map(t => (
        <div key={t.id} className={`${styles.toast} ${styles[t.type]}`}>
          <span className={styles.icon}>
            {t.type === 'success' ? '✓' : '✕'}
          </span>
          <span>{t.msg}</span>
        </div>
      ))}
    </div>
  )
}
