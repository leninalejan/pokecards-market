import styles from './TypeBadge.module.css'

export default function TypeBadge({ type }) {
  return (
    <span className={`${styles.badge} ${styles[type] || styles.normal}`}>
      {type}
    </span>
  )
}
