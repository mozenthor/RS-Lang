import React from 'react';
import styles from '../Page.module.css';
import footerLogo from '../assets/rs_school.svg';
import socailLogo from '../assets/git.svg';
const Footer = () => {
  return (
    <footer className={styles.footer}>
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
