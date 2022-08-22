import React from 'react';
import Menu from './Menu';
import BtnAuth from './BtnAuth';
import styles from '../Page.module.css'
const Header = () => {
  return (
    <header className={styles.header}>
      <Menu/>     
      <BtnAuth/>
    </header>
  );
};
export default Header;
