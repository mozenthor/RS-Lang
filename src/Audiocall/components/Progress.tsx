import style from '../AudioCall.module.css';

const Progress = (props: { value: string[] }) => {
  return (
    <ul className={style.progress}>
      {props.value.map((status, i) => (
        <li key={i} className={style.progress__item + ' ' + style[status]}></li>
      ))}
    </ul>
  );
};
export default Progress;
