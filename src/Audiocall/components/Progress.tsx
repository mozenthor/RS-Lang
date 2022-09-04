
import style from '../AudioCall.module.css';
import { useState, useEffect } from 'react';

const Progress = (props: { value: string[] }) => {
  // const [progress, setProgress] = useState(props.value);
  // useEffect(() => {
  //   setProgress(props.value);
  // }, [props.value]);

  return (
    <ul className={style.progress}>
      {props.value.map((status, i) => (
        <li key={i} className={style.progress__item + ' ' + style[status]}></li>
      ))}
    </ul>
  );
};
export default Progress;
