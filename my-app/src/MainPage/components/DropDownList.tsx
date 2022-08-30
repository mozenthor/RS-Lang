import React from 'react';
import dropDownPropsProps from '../../types';
import styles from '../Page.module.css';
import { Link } from 'react-router-dom';

const DropDownList = (props: dropDownPropsProps) => {
  return (
    <ul className={styles.dropdown__list} onMouseLeave={props.mouseleave}>
      <li className={styles.dropdown__item}>
        <Link className={styles.dropdown__link} to="/textbook">
          Учебник
        </Link>
      </li>
      <li className={styles.dropdown__item}>
        <Link className={styles.dropdown__link} to="/textbook">
          Аудиовызов
        </Link>
      </li>
      <li className={styles.dropdown__item}>
        <Link className={styles.dropdown__link} to="/textbook">
          Спринт
        </Link>
      </li>
      <li className={styles.dropdown__item}>
        <Link className={styles.dropdown__link} to="/stats">
          Статистика
        </Link>
      </li>
    </ul>
  ) 
};
export default DropDownList;
