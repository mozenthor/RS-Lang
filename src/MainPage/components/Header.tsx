import Menu from './Menu';
import styles from '../Page.module.css';
import LoginLogoutMain from './../../AuthorizationA/components/logMainPage';
import { Logo } from './Logo';


const Header = () => {
   return (
    <header className={styles.header}>
      <div className={styles.header__menuLogo}>
        <Logo />
        <Menu/>
      </div>
      <LoginLogoutMain></LoginLogoutMain>
    </header>
  );
};
export default Header;
