import style from '../AudioCall.module.css';
import { Tstats, Twords } from '../../types';
import { updateStats } from '../../service/service';
import { Dispatch, SetStateAction } from 'react';

const Stat = (props: { value: Tstats; words: Twords[], reset: Dispatch<SetStateAction<Tstats>> }) => {
  const statistics = props.value;
  const init = Boolean(statistics.correct.length || statistics.incorrect.length);
 
  if (init) {  
    updateStats(statistics, 'audiocall');
  }
  
  const statList = props.words.map((e) => {
    const isGuessed = statistics.correct.includes(e.id);
    return (
      <div key={e.id} className={`${style.stat__row} ${isGuessed ? style.succeses : style.wrong}`}>
        <span className={style.stat__col}>{e.word}</span>
        <span className={style.stat__col}>{e.transcription}</span>
        <span className={style.stat__col}>{e.wordTranslate}</span>
      </div>
    );
  });

  return (
    <div>
      {init && (
        <div className={style.stat}>
          <h1 className={style.stat__title}>Твои результаты</h1>
          <div className={style.stat__container}>
            <div className={style.stat__header}>
              <div className={style.stat__inner}>Изучено слов: {statistics.correct.length}</div>
              <div className={style.stat__inner}>Необходимо изучить: {statistics.incorrect.length} </div>
              <div className={style.stat__inner}>Лучшая серия: {statistics.maxtry}</div>
            </div>
            <div className={style.stat__table}>{statList}</div>
            <div className={style.stat__btnblock}>
              <a className={style.stat__btn + ' ' + style.btn} href="/audiocall">
                Играть еще
              </a>
              <a className={style.stat__btn + ' ' + style.btn} href="/">
                На главную
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Stat;
