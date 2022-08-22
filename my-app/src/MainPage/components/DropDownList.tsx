import React from 'react';
import dropDownPropsProps from '../../types';
import styles from '../Page.module.css';

const DropDownList = (props: dropDownPropsProps) => {
  return (
    <ul className={styles.dropdown__list} onMouseLeave={props.mouseleave}>
      <li className={styles.dropdown__item}>
        <a className={styles.dropdown__link} href="/textbook">
          Учебник
        </a>
      </li>
      <li className={styles.dropdown__item}>
        <a className={styles.dropdown__link} href="/textbook">
          Аудиовызов
        </a>
      </li>
      <li className={styles.dropdown__item}>
        <a className={styles.dropdown__link} href="/textbook">
          Спринт
        </a>
      </li>
      <li className={styles.dropdown__item}>
        <a className={styles.dropdown__link} href="/textbook">
          Статистика
        </a>
      </li>
    </ul>
  ) 
};
export default DropDownList;
