import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../Page.module.css';
import book from '../assets/book.svg';
import reveal from '../assets/pencils.svg';
import clock from '../assets/clocks.svg';
import stat from '../assets/stat.svg';
import { store } from '../../SprintGame/appSprintGame';
const Tile = () => {
  return (
    <section className={styles.posters}>
      <div className={styles.tile}>
        <img className={styles.tile__img} src={book} alt="logo" />
        <h3 className={styles.tile__title}>Учебник</h3>
        <p className={styles.tile__text}>электронный учебник</p>
        <Link className={styles.tile__button} to="/textbook/">
          Вперед
        </Link>     
      </div>
      <div className={styles.tile}>
        <img className={styles.tile__img} src={reveal} alt="logo" />
        <h3 className={styles.tile__title}>Аудиовызов</h3>
        <p className={styles.tile__text}>мини-игра</p>
        <Link className={styles.tile__button} to="/audiocall">
          Вперед
        </Link>
      </div>
      <div className={styles.tile}>
        <img className={styles.tile__img} src={clock} alt="logo" />
        <h3 className={styles.tile__title}>Спринт</h3>
        <p className={styles.tile__text}>мини-игра</p>
        <Link onClick={() => store.unsetParams()} className={styles.tile__button} to="/sprint">
          Вперед
        </Link>
      </div>
      <div className={styles.tile}>
        <img className={styles.tile__img} src={stat} alt="logo" />
        <h3 className={styles.tile__title}>Статистика</h3>
        <p className={styles.tile__text}>твои результаты</p>
        <Link className={styles.tile__button} to="/stats">
          Вперед
        </Link>
      </div>
    </section>
  );
};
export default Tile;
