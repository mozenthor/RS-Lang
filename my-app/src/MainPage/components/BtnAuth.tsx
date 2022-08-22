import React from 'react';
import { Link } from 'react-router-dom';

import styles from '../Page.module.css'
const BtnAuth = () => {
  return (
    <Link to='/authorization' className={ styles.header__auth }>Войти</Link>   
  );
};
export default BtnAuth;
