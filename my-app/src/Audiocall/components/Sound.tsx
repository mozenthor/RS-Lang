import style from '../AudioCall.module.css';

import audioSrc from '../assets/audio.svg';
import { ReactNode, useEffect, useMemo } from 'react';

const Sound = (props: { value: string }) => {
  const SERVER_URL = 'https://final-rslang-backend.herokuapp.com/';
  const audioSource = SERVER_URL + props.value;
  const audio = new Audio(audioSource);

  useEffect(() => {
    audio.autoplay = true;
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
