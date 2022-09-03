import React, { useState, useEffect } from 'react';
import style from './AudioCall.module.css';
import data from './components/data';
import Game from './components/Game';
import Greeting from './components/Greeting';
import Stat from './components/Stat';
import { Tstats } from '../types';
import statDefault from './data/default';

const ANSWERS_COUNT = 5;

const arrayShuffle = (array: string[]) => {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
};
const getRandomAnswers = (index: number) => {
  const container = [];
  container.push(index);
  while (container.length < ANSWERS_COUNT) {
    const randomIndex: number = Math.floor(Math.random() * data.length);

    if (!container.includes(randomIndex)) {
      container.push(randomIndex);
    }
  }
  const random = container.map((e) => data[e].wordTranslate);
  const shuffledArray = arrayShuffle(random);
  return shuffledArray;
};

const arr = data.map((el, i) => {
  const answers = getRandomAnswers(i);
  return { ...el, answers: answers };
});

const AudioCall = () => {
  const [isGreeting, setGreeting] = useState(true);

  const [stat, setStat] = useState(statDefault);
  const [isGame, setGame] = useState(false);

 const greetingCb = () => {
  setGreeting(false)
  setGame(true);
 }
 const gameCb = (obj: Tstats) => {
  setGame(false)
  setStat(obj);
 } 
  return (
    <div>
      {isGreeting && <Greeting cb={greetingCb} />}
      {isGame && <Game cb={gameCb} words={arr} />}
      {stat && <Stat value={stat}/>}
    </div>
  );
};
export default AudioCall;
