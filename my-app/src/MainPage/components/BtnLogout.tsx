import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../../AuthorizationA/AuthApp.tsx/AuthApp';

import styles from '../Page.module.css';

const BtnLogout = (props: any) => {
 
 const { store } = useContext(Context);
 const { logout } = props;
  return (
    <Link to="/" className={styles.header__auth} onClick = { logout(false) }>
      Выйти
    </Link>
  );
};
export default BtnLogout;
