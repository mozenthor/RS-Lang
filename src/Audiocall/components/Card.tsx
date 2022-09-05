import { useState, useEffect } from 'react';
import style from '../AudioCall.module.css';
import Answers from './Answers';
import Sound from './Sound';
import { Twords } from '../../types';
import Description from './Description';

const AudioSelect = (props: { sound: string; answers: string[]; cb: any; words: Twords }) => {
  const [isVisible, setVisible] = useState(false);
  useEffect(() => {
    setVisible(false);
  }, [props.answers]);
  const toggleVisiblity = () => {
    setVisible(true);
  };
  return (
    <div className={style.audioselect}>
      <div className={style.audioselect__center}>
        <Sound value={props.words.audio} />
        {isVisible && <Description words={props.words} />}
      </div>
      <Answers words={props.words} cb={props.cb} description={toggleVisiblity} />
    </div>
  );
};
export default AudioSelect;
