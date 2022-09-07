import styles from './Games.module.css';
export const Audiocall: React.FC = () => {
    return (
    <div className={styles.tile}>
        <img className={styles.tile__img} alt="logo" />
        <h3 className={styles.tile__title}>Аудиовызов</h3>
        <p className={styles.tile__text}>мини-игра</p>
        <a className={styles.tile__button} href="#">
          Вперед
        </a>
      </div>)
}