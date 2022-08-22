import React from 'react';
import styles from '../Page.module.css';
import book from '../assets/book.svg';
import reveal from '../assets/pencils.svg';
import clock from '../assets/clocks.svg';
import stat from '../assets/stat.svg';
const Tile = () => {
  return (
    <section className={styles.posters}>
      <div className={styles.tile}>
        <img className={styles.tile__img} src={book} alt="logo" />
        <h3 className={styles.tile__title}>Учебник</h3>
        <p className={styles.tile__text}>электронный учебник</p>
        <a className={styles.tile__button} href="#">
          Вперед
        </a>
      </div>
      <div className={styles.tile}>
        <img className={styles.tile__img} src={reveal} alt="logo" />
        <h3 className={styles.tile__title}>Аудиовызов</h3>
        <p className={styles.tile__text}>мини-игра</p>
        <a className={styles.tile__button} href="#">
          Вперед
        </a>
      </div>
      <div className={styles.tile}>
        <img className={styles.tile__img} src={clock} alt="logo" />
        <h3 className={styles.tile__title}>Спринт</h3>
        <p className={styles.tile__text}>мини-игра</p>
        <a className={styles.tile__button} href="#">
          Вперед
        </a>
      </div>
      <div className={styles.tile}>
        <img className={styles.tile__img} src={stat} alt="logo" />
        <h3 className={styles.tile__title}>Статистика</h3>
        <p className={styles.tile__text}>твои результаты</p>
        <a className={styles.tile__button} href="#">
          Вперед
        </a>
      </div>
    </section>
  );
};
export default Tile;
