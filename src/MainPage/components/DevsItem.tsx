import React from 'react';
import styles from '../Page.module.css';
import avatar from '../assets/avatar.png';
interface IDevsItem {
    info: {
      name: string,
      text: string,
    }
}
const DevsItem: React.FC<IDevsItem> = (props) => {
  return (     
          <div className={styles.row}>
            <div className={styles.row__avatar}>
              <img className={styles.row__img} src={avatar} alt="dev" />
            </div>
            <div className={styles.row__content}>
              <h2 className={styles.row__title}>{props.info.name}</h2>
              <p className={styles.row__text}>{props.info.text}</p>
            </div>
          </div>       
  );
};
export default DevsItem;