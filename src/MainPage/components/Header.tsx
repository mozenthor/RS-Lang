import Menu from './Menu';
import styles from '../Page.module.css';
import LoginLogoutMain from './../../AuthorizationA/components/logMainPage';


const Header = () => {
   return (
    <header className={styles.header}>
      <Menu/>
      <LoginLogoutMain></LoginLogoutMain>
    </header>
  );
};
export default Header;
