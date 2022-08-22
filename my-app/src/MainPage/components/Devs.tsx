import React from 'react';
import styles from '../Page.module.css'
import DevsItem from './DevsItem';
const Devs = () => {
  return (   
      <section className={styles.devs}>
        <h3 className={styles.devs__title}>О команде</h3>
      <DevsItem></DevsItem>
      <DevsItem></DevsItem>
      <DevsItem></DevsItem>
      </section>   
  );
};
export default Devs;