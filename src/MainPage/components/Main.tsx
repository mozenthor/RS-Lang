import React from 'react';
import styles from '../Page.module.css'
import Tile from './Tile';
import Video from './Video';
import Devs from './Devs';
const Main = () => {
  return (
    <main className={ styles.main }>
     <Tile/>
     <Video/>
     <Devs/>
    </main>
  );
};
export default Main;