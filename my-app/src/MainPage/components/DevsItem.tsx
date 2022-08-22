import React from 'react';
import styles from '../Page.module.css'
import avatar from '../assets/avatar.png'
const DevsItem = () => {
  return (     
          <div className={styles.row}>
            <div className={styles.row__avatar}>
              <img className={styles.row__img} src={avatar} alt="dev" />
            </div>
            <div className={styles.row__content}>
              <h2 className={styles.row__title}>DEV1</h2>
              <p className={styles.row__text}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
            </div>
          </div>       
  );
};
export default DevsItem;