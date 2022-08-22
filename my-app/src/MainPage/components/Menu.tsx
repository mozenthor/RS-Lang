import React, { useState } from 'react';
import DropDownList from './DropDownList';
import styles from '../Page.module.css';
const Menu = () => {
  const [isDropped, setDropped] = useState(false);
  const toogleMenu = () => { setDropped(!isDropped); }
  return (
    <div className={ styles.header__menu }  onClick={ toogleMenu }>
      <div className={ styles.dropdown__header } >Menu</div>
        { isDropped && (<DropDownList mouseleave={ toogleMenu }/>) }
    </div>
  );
};
export default Menu;
