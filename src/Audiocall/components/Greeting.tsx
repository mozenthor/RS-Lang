import style from '../AudioCall.module.css';
import { levels } from '../data/default';
const Greeting = (props: { cb: (value: string) => void }) => {
  return (
    <div className={style.greeting}>
      <h1 className={style.greeting__title}>Аудиовызов</h1>
      <p className={style.greeting__text}>
        В этой мини-игре вам будет предложено выбрать правильный вариант перевода среди нескольких.{' '}
      </p>
      <ul className={style.greeting__text + ' ' + style.list}>
        <li className={style.list__item}>Используйте мышь или клавиши от 1 до 5 для выбора ответа</li>
        <li className={style.list__item}>Вы можете пропустить текущее слово нажав "Дальше" или клавишу "Enter"</li>
        <li className={style.list__item}>Для повторного звучания слова нажмите на картинку или клавишу "Space"</li>
      </ul>

      <div className={style.greeting__container}>
        {levels.map((e, i) => (
          <button
            key={e}
            className={style.greeting__btn}
            onClick={() => {
              props.cb(String(i));
            }}
          >
            {e}
          </button>
        ))}
      </div>
    </div>
  );
};
export default Greeting;
