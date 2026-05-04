import styles from './Loader.module.css'

export default function Loader() {
  return (
    <div className={styles.wrap}>
      <div className={styles.ball} />
      <p className={styles.txt}>Cargando cartas desde la PokéAPI...</p>
    </div>
  )
}
