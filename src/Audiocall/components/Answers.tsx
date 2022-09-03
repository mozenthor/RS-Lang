import React, { useState, useEffect } from 'react';
import { Twords } from '../../types';

import style from '../AudioCall.module.css';
const Answers = (props: { words: Twords, cb: any, description: any}) => {
  const answers = props.words.answers;
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [isAnswered, setAnswered] = useState(false);
  const correctAnswer = props.words.wordTranslate;
  useEffect(() => {
    setAnswered(false);
  }, [answers]);

  const answerHandler = (clickEvent: React.MouseEvent<HTMLElement>) => {
    const answer = (clickEvent.target as HTMLButtonElement).value;
    setCurrentAnswer(answer);
    props.cb(answer);   
    setAnswered(true);
    props.description();
  };

  const buttons = answers.map((value: string) => {
    let coloredAnswer = '';
    if (isAnswered) {
      coloredAnswer = value === correctAnswer ? style.succeses : '';
      coloredAnswer = currentAnswer === value && currentAnswer !== correctAnswer ? style.wrong : coloredAnswer;
    }
    return (
      <button
        className={style.btn + ' ' + coloredAnswer}
        value={value}
        disabled={isAnswered}
        onClick={answerHandler}
        key={value}>
        {value}
      </button>
    );
  });

  return <div className={style.answers}>{buttons}</div>;
};
export default Answers;
