import style from '../AudioCall.module.css';
import { useState, useEffect } from 'react';
import { Tstats } from '../../types';
import { updateStats } from '../../service/service';

const Stat = (props: { value: Tstats }) => {
  const statistics = props.value;
  const init = Boolean(statistics.correct.length || statistics.incorrect.length);
  // const [isVisible, setVisible] = useState(init);
  // useEffect(() => {},[props])
  useEffect(() => {
    //updateStats(props.value, 'audiocall');
    console.log(props.value)
  }, [props]);
  return (
    <div>
      {init && (
        <div className={style.stat}>
          <h1 className={style.stat__title}>Твои результаты</h1>
          <div className={style.stat__container}>
            <div>Изучено слов {statistics.correct.length}</div>
            <div>Необходимо изучить {statistics.incorrect.length} </div>
            <div>Лучшая серия {statistics.maxtry}</div>
            <div>.....</div>
            <div>.....</div>
            <div>.....</div>
            <div>.....</div>
            <div>.....</div>
            <div>.....</div>
            <button>Сыграть еще</button>
          </div>
        </div>
      )}
    </div>
  );
};
export default Stat;
