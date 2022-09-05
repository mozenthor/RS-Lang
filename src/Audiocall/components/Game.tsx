import { useState, useEffect } from 'react';
import style from '../AudioCall.module.css';
import AudioSelect from '../components/Card';
import Progress from '../components/Progress';
import { Twords, Tstats } from '../../types';
import stat, { levels, ENTER_CODE } from '../data/default';

const Game = (props: { words: Twords[]; cb: (value: Tstats) => void; level: string; page: string }) => {
  const [index, setIndex] = useState(0);
  const [wordsList] = useState(props.words);
  const [currentTry] = useState({ count: 0 });
  const [stats, setStats] = useState({ ...stat });
  const progress: string[] = new Array(wordsList.length).fill('new');
  const [status, setStatus] = useState([...progress]);
  const [words, setWords] = useState(wordsList[index]);
  const engLevel = parseInt(props.level) || 0;
  const info = `Уровень: ${levels[engLevel]} Страница: ${props.page}`;
 
  useEffect(() => {
    setWords(wordsList[index]);
  }, [index]);
  useEffect(() => {
    setStats({ ...stat });

  }, [props]);
  const addStat = (isRight: boolean) => {
    if (isRight) {
      stats.correct.push(words.id);
      currentTry.count += 1;
    } else {
      stats.incorrect.push(words.id);
    }

    if (!isRight || index === wordsList.length - 1) {
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
      props.cb(stats);
    }
  };
  const keyboardHandler = (e: KeyboardEvent): void => {
    const code = e.key;
    if (code === ENTER_CODE) {
      next();
    }
  };
  const compare = (answer: string): void => {
    let color = 'wrong';
    if (words.wordTranslate === answer) {
      color = 'succeses';
    }
    colorStatus(color);
  };

  useEffect(() => {
    window.addEventListener('keydown', keyboardHandler);
    return () => {
      window.removeEventListener('keydown', keyboardHandler);
    };
  }, [index]);

  return (
    <div className={style.audiocall}>
      <div className={style.audiocall__level}>{info}</div>
      <Progress value={status} />
      <AudioSelect sound={words.audio} answers={words.answers} words={words} cb={compare} />
      <button className={style.btn} onClick={next}>
        Дальше <span className={style.btn__hint}>ENTER</span>
      </button>
    </div>
  );
};
export default Game;
