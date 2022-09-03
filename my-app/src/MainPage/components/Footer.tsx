import React from 'react';
import styles from '../Page.module.css';
import footerLogo from '../assets/rs_school.svg';
import socailLogo from '../assets/git.svg';
import { useLocation } from 'react-router-dom';

const Footer = () => {
const disabled = ['/audiocall', '/sprint'];
const path = useLocation().pathname;
const isAllowed = !disabled.includes(path);

  return (
    <footer className={isAllowed ? styles.footer : styles.hide }>
      <a href="https://rs.school/js/" className={styles.footer__link}>
        <img src={footerLogo} className={styles.footer__logo} />
      </a>
      <p className={styles.date}>©2022 RS Lang</p>
      <div className={styles.social}>
        <img className={styles.social__logo} src={socailLogo} alt="github" />
        <a className={styles.social__github} href="https://github.com/ mozenthor">
          mozenthor
        </a>
        <a className={styles.social__github} href="https://github.com/oscarishe">
          oscarishe
        </a>
        <a className={styles.social__github} href="https://github.com/primapsa">
          primapsa
        </a>
      </div>
    </footer>
  );
};
export default Footer;
