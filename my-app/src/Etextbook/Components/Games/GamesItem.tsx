import { IGamesItemProps } from './Games';
import styles from './Games.module.css';

export const GamesItem: React.FC<IGamesItemProps> = (props) => {
    return (
    <div className={styles.tile}>
        <img className={styles.tile__img} src={props.img} alt="logo" />
        <h3 className={styles.tile__title}>{props.name}</h3>
        <p className={styles.tile__text}>мини-игра</p>
        <button className={styles.tile__button} disabled = {props.isActive}>
          {!props.isActive ? "Вперед" : "Все слова изучены"}
        </button>
      </div>)
}