import React from 'react';
import styles from '../Page.module.css';

const Video = () => {
  return (
    <section className={styles.about}>
      <h2 className={styles.about__title}>Как работает приложение</h2>
      <iframe
        className={styles.about__video}        
        src="https://www.youtube.com/embed/39miz6qt2aY"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </section>
  );
};
export default Video;
