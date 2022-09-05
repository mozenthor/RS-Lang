import { useState, useEffect } from 'react';

import Game from '../components/Game';
import Greeting from '../components/Greeting';
import Stat from '../components/Stat';
import { Tstats, TgameRoute, Twords } from '../../types';
import statDefault from '../data/default';
import { fetchPreparedWords, randomGroup, randomPage } from '../services';

const GameRoute = (props: { init: TgameRoute }) => {
  const initGreeting = props.init.group || props.init.page;
  const page = props.init.page || String(randomPage());
  const group = props.init.group || String(randomGroup());
  const [words, setWords] = useState<Twords[]>([]);
  const [isLoaded, setLoaded] = useState(false);
  const [level, setLevel] = useState(group);
  const [isGreeting, setGreeting] = useState(!initGreeting);
  const [gameStat, setGameStat] = useState({...statDefault});
  const [isGame, setGame] = useState(!isGreeting);
  const [isStat, setIsStat] = useState(false);

  useEffect(() => {
    fetchPreparedWords(page, level, setWords);
  }, []);

  useEffect(() => {
    setLoaded(!!words.length);
  }, [words]);

  const greetingCb = (value: string) => {
    setLevel(value);
    setGreeting(false);
    setGame(true);
  };
  const gameCb = (obj: Tstats) => {
    setGame(false);
    setIsStat(true);
   // console.log(obj)
    // const r = Object.assign({},obj)
     setGameStat({...obj});
    // gameStat.incorrect = [];
    // gameStat.correct = [];
    // gameStat.maxtry = 0;
    // setGameStat(gameStat);
    // console.log(gameStat)
  };

  const content = (
    <div>
      {isGreeting && <Greeting cb={greetingCb} />}
      {isGame && <Game cb={gameCb} words={words} level={level} page={page} />}
      {isStat && <Stat value={gameStat} words={words} reset ={setGameStat} />}
    </div>
  );
  return <div>{isLoaded && content}</div>;
};
export default GameRoute;
