import React from 'react';
import { Link } from 'react-router-dom';

import styles from '../Page.module.css'
const BtnLogin = () => {
  return (
    <Link to='/authorization' className={ styles.header__auth }>Войти</Link>   
  );
};
export default BtnLogin;
