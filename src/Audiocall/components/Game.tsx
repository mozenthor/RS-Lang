import React, { useState, useEffect } from 'react';
import style from '../AudioCall.module.css';
import AudioSelect from '../components/Card';
import Progress from '../components/Progress';
import { Twords, reactCb, Tstats } from '../../types';
import stat from '../data/default';

const Game = (props: { words: Twords[]; cb: (value:Tstats ) => void }) => {
  const [index, setIndex] = useState(0);
  const [wordsList] = useState(props.words);
  const [isGaming, setGaming] = useState(true);
  const [currentTry] = useState({ count: 0 });
  const [stats] = useState(stat);
  const progress: string[] = new Array(wordsList.length).fill('new');
  const [status, setStatus] = useState([...progress]);
  const [words, setWords] = useState(wordsList[index]);

  useEffect(() => {
    setWords(wordsList[index]);
  }, [index]);

//   useEffect(() => {
//     props.cb(true);
//   }, [isGaming]);

  const addStat = (isRight: boolean) => {   
    
    if (isRight) {
      stats.correct.push(words.id);
      currentTry.count += 1;
    } else {
      stats.incorrect.push(words.id);      
    }
    
    if(!isRight || index === wordsList.length - 1 ){
      if (currentTry.count > stats.maxtry) {
        stats.maxtry = currentTry.count;
      }
      currentTry.count = 0;
    }
  };

  const colorStatus = (color = 'wrong') => {
    if (status[index] !== 'new') return;
    status[index] = color;
    const isRight = !(color === 'wrong');
    addStat(isRight);
    setStatus([...status]);
  };

  const next = () => {
    
    if (index < wordsList.length - 1) {
      setIndex(index + 1);
      colorStatus();
      
    } else {
      colorStatus();
      setGaming(false);
      props.cb(stats);
    }
    console.log(stats);
   
  };

  const compare = (answer: string) => {
    let color = 'wrong';
    if (words.wordTranslate === answer) {
      color = 'succeses';
    }
    colorStatus(color);
  };

  return (
    <div className={style.audiocall}>
      <Progress value={status} />
      <AudioSelect sound={words.audio} answers={words.answers} words={words} cb={compare} />
      <button className={style.btn} onClick={next}>
        Дальше
      </button>
    </div>
  );
};
export default Game;
