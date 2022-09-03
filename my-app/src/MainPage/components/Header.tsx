import React, { useState }  from 'react';
import Menu from './Menu';
import BtnLogin from './BtnLogin';
import styles from '../Page.module.css'
import BtnLogout from './BtnLogout';
import Logout from '../../AuthorizationA/components/logout';


const Header = () => {

 const userName = localStorage.getItem('userName');
 const [isAuth, setAuth] = useState(Boolean(userName)) 

   return (
    <header className={styles.header}>    
      <Menu/>
      <div>{ isAuth && <p>{userName}</p>}</div> 
    {
      isAuth ? <Logout/> : <BtnLogin/>
    }  
    </header>
  );
};
export default Header;
