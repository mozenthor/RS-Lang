import React from 'react';
import { devsData } from '../assets/devsData';
import styles from '../Page.module.css'
import DevsItem from './DevsItem';
const Devs = () => {
  return (   
      <section className={styles.devs}>
        <h3 className={styles.devs__title}>О команде</h3>
        {devsData.map(item => <DevsItem info={item}/>)}
      </section>   
  );
};
export default Devs;