import { observer } from "mobx-react-lite";
import { FC, useContext } from "react";
import { Context } from "../appSprintGame";

const MainGame: FC = () => {
  const { store } = useContext(Context);

  return (
    <div className="sprint__wrapper">
      <h1>Спринт</h1>
      <div className="sprint__game-info">
        <div>
          Уровень сложности:
          <span style={{fontWeight: 600, marginLeft: '5px'}}>{store.ChoiseButtonsPropsArray[Number(store.group)].level}</span>
          
        </div>
        <div>
          Очки:
          <span style={{fontWeight: 600, marginLeft: '5px'}}>{store.score}</span>
        </div>
        <div>Время:
          <span style={{fontWeight: 600, marginLeft: '5px'}}>{store.time}</span>
        </div>
      </div>
      <div className="sprint__answer-question">
        {store.question}: {store.answer}
      </div>
      <div className="sprint__answer-buttons">
        <button
          className="sprint__false-button"
          onClick={() => {
            store.randomParaSlov();
            store.setUserAnswer(false);
            store.isGuessed(store.currentWord);
          }}
        >
          Неверно
        </button>
        <button
          className="sprint__true-button"
          onClick={() => {
            store.randomParaSlov();
            store.setUserAnswer(true);
            store.isGuessed(store.currentWord);
          }}
        >
          Верно
        </button>
      </div>
    </div>
  )
}

export default observer(MainGame);