import React, { useState, useEffect } from 'react';
import { Twords } from '../../types';

import style from '../AudioCall.module.css';
const Answers = (props: { words: Twords; cb:{(v: string): void }; description: {():void} }) => {
  const answers = props.words.answers;
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [isAnswered, setAnswered] = useState(false);
  const correctAnswer = props.words.wordTranslate;

  useEffect(() => {
    setAnswered(false);
  }, [answers]);

  const handleAnswer = (answer: string) => {
    setCurrentAnswer(answer);
    props.cb(answer);
    setAnswered(true);
    props.description();
  };

  const answerHandler = (clickEvent: React.MouseEvent<HTMLElement>) => {
    const answer = (clickEvent.target as HTMLButtonElement).value;
    handleAnswer(answer);
  };

  const buttons = answers.map((value: string, ind: number) => {
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
        key={value}
      >
        {value}
        <span className={style.btn__hint}>{ind + 1}</span>
      </button>
    );
  });

  const keyboardHandler = (e: KeyboardEvent): void => {
    const keys = ['Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5'];
    const code = e.code;
    const isAllowed = keys.indexOf(code);

    if (isAllowed >= 0) {
      const answer = answers[isAllowed];
      handleAnswer(answer);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', keyboardHandler);
    return () => {
      window.removeEventListener('keydown', keyboardHandler);
    };
  }, [answers]);

  return <div className={style.answers}>{buttons}</div>;
};
export default Answers;
