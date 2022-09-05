import style from '../AudioCall.module.css';

import audioSrc from '../assets/audio.svg';
import { useEffect } from 'react';

const Sound = (props: { value: string }) => {
  const SERVER_URL = 'https://final-rslang-backend.herokuapp.com/';
  const audioSource = SERVER_URL + props.value;
  const audio = new Audio(audioSource);
  const keyboardHandler = (e: any): void => {
    const code = e.code;
    if (code === 'Space') {
      audio.play();
    }
  };
  useEffect(() => {
    audio.autoplay = true;
    window.addEventListener('keydown', keyboardHandler);
    return () => {
      window.removeEventListener('keydown', keyboardHandler);
    };
  }, [props.value]);

  return (
    <div>
      <img
        src={audioSrc}
        className={style.sound}
        onClick={() => {
          audio.play();
        }}
      />
      {audio.autoplay}
    </div>
  );
};
export default Sound;
