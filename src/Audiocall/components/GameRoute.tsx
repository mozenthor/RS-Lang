import React, { useState, useEffect } from 'react';

import Game from '../components/Game';
import Greeting from '../components/Greeting';
import Stat from '../components/Stat';
import { Tstats } from '../../types';
import { TgameRoute } from '../../types';
import statDefault from '../data/default';
import { fetchPreparedWords, randomGroup, randomPage } from '../services';
import { Twords } from '../../types';

const GameRoute = (props: { init: TgameRoute }) => {
  const initGreeting = props.init.group || props.init.page;
  const page = props.init.page || String(randomPage());
  const group = props.init.group || String(randomGroup());
  const [words, setWords] = useState<Twords[]>([]);
  const [isLoaded, setLoaded] = useState(false);
  const [isGreeting, setGreeting] = useState(Boolean(!initGreeting));
  const [stat, setStat] = useState(statDefault);
  const [isGame, setGame] = useState(false);

  useEffect(() => {
    fetchPreparedWords(page, group, setWords);
  }, []);

  useEffect(() => {
    if (words.length) {
      setLoaded(true);
    } else {
      setLoaded(false);
    }
  }, [words]);

  const greetingCb = () => {
    setGreeting(false);
    setGame(true);
  };
  const gameCb = (obj: Tstats) => {
    setGame(false);
    setStat(obj);
  };

  const content = (
    <div>
      {isGreeting && <Greeting cb={greetingCb} />}
      {isGame && <Game cb={gameCb} words={words} />}
      {stat && <Stat value={stat} />}
    </div>
  );
  return <div>{isLoaded && content}</div>;
};
export default GameRoute;
