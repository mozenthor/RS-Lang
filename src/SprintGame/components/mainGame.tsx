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
          <span style={{ fontWeight: 600, marginLeft: '5px' }}>{store.ChoiseButtonsPropsArray[Number(store.group)].level}</span>

        </div>
        <div>
          Очки:
          <span style={{ fontWeight: 600, marginLeft: '5px' }}>{store.score}</span>
        </div>
        <div>Время:
          <span style={{ fontWeight: 600, marginLeft: '5px' }}>{store.time}</span>
        </div>
      </div>
      <div className="sprint__answer-question">
        {store.question}: {store.answer}
      </div>
      <div className="sprint__answer-buttons">
        <button
          disabled={store.disabledButton}
          className="sprint__false-button"
          onClick={async () => {
            store.chekAnswer(false);
          }}
        >
          Неверно
          <div className="sprint__key">1</div>
        </button>
        <button
          disabled={store.disabledButton}
          className="sprint__true-button"
          onClick={async () => {
            store.chekAnswer(true);
          }}
        >
          Верно
          <div className="sprint__key">2</div>
        </button>
      </div>
    </div>
  )
}

export default observer(MainGame);