import { Link } from 'react-router-dom';
import { store } from '../../../SprintGame/appSprintGame';
import { IGamesItemProps } from './Games';
import styles from './Games.module.css';

export const GamesItem: React.FC<IGamesItemProps> = (props) => {
    return (
    <div className={styles.tile}>
        <img className={styles.tile__img} src={props.img} alt="logo" />
        <h3 className={styles.tile__title}>{props.name}</h3>
        <p className={styles.tile__text}>мини-игра</p>
        <Link onClick={() => store.unsetParams()} to= {`${props.link}/${props.params.group}/${props.params.page}`} >
        <button className={styles.tile__button} disabled = {props.isActive}>
          {!props.isActive ? "Вперед" : "Все слова изучены"}
        </button>
        </Link>
      </div>)
}