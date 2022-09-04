import axios from 'axios';
import { Dispatch, SetStateAction } from 'react';
import { Twords } from '../../types';

const ANSWERS_COUNT = 5;

export const arrayShuffle = (array: string[]) => {
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
type TwordsSingle = Omit<Twords, 'answers'>;
export const getRandomAnswers = (index: number, data: TwordsSingle[]) => {
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

export const preparedWords = (data: TwordsSingle[]) => {
  return data.map((el, i) => {
    const answers = getRandomAnswers(i, data);
    return { ...el, answers: answers };
  });
};

export async function fetchPreparedWords(page: string, group: string, fn: Dispatch<SetStateAction<Twords[]>>) {
  const response = await axios.get(`https://final-rslang-backend.herokuapp.com/words?page=${page}&group=${group}`);
  const result = await response.data;
  const prepared = preparedWords(result);
  fn(prepared);
  //return {...(await response.data)};
}
export const randomGroup = () => Math.floor(Math.random() * 5);
export const randomPage = () => Math.floor(Math.random() * 20);
