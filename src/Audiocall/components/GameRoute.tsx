import React, { useState, useMemo } from 'react';
import axios from "axios";

import Game from '../components/Game';
import Greeting from '../components/Greeting';
import Stat from '../components/Stat';
import { Tstats } from '../../types';
import { TgameRoute } from '../../types';
import statDefault from '../data/default';
import { IWord } from '../../interfaces/interfaces';
import data from '../components/data';
import { preparedWords } from '../services';

const arr = preparedWords(data);

const GameRoute = (props: { init: TgameRoute }) => {

  const initGreeting = props.init.group || props.init.page;

  const [isGreeting, setGreeting] = useState(Boolean(!initGreeting));
  const [stat, setStat] = useState(statDefault);
  const [isGame, setGame] = useState(false);
//   const words = useMemo( async () => {
   
//         const response = await axios.get<IWord[]>(`https://final-rslang-backend.herokuapp.com/words?page=0&group=0`);
//         return response.data;
      
//   },[props]);
  const greetingCb = () => {
    setGreeting(false);
    setGame(true);
  };
  const gameCb = (obj: Tstats) => {
    setGame(false);
    setStat(obj);
  };
  return (
    <div>
      {isGreeting && <Greeting cb={greetingCb} />}
      {isGame && <Game cb={gameCb} words={arr} />}
      {stat && <Stat value={stat} />}
    </div>
  );
};
export default GameRoute;
