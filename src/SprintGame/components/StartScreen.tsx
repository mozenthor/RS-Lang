import { observer } from "mobx-react-lite";
import { FC, useContext } from "react";
import { Context } from "../appSprintGame";
import ChoiseLevelButtons from "./ChoiseLevelButtons";

const StartScreen: FC = () => {
  const { store } = useContext(Context);

  const start = () => {
    store.generateQuestion();
    store.setState('mainGame');
    store.startTime = new Date().getTime();
    store.timer();
  }

  if (store.group === '') {
    return (
      <div className="sprint__wrapper">
        <h1>Спринт</h1>
        <div className="sprint__description">В этой игре вам необходимо определить соответсвует ли перевод предложенному слову за отведенное время</div>
        <div>Выберите уровень сложности:</div>
        <ChoiseLevelButtons></ChoiseLevelButtons>
      </div>
    )
  } else {
    return (
      <div className="sprint__wrapper">
        <h1>Спринт</h1>
        <div className="sprint__description">В этой игре вам необходимо определить соответсвует ли перевод предложенному слову за отведенное время</div>
        <div>
          Уровень сложности: <span style={{fontWeight: 600, marginLeft: '5px'}}>{store.ChoiseButtonsPropsArray[Number(store.group)].level}</span>
        </div>
        <div className="sprint__start-buttons_wrapper">
          <button
            className="sprint__start-button"
            onClick={start}
          >
            Начать
          </button>
          <button
            className="sprint__start-button"
            onClick={() => store.group = ''}
          >
            Изменить
          </button>
        </div>
      </div>
    )
  }


}

export default observer(StartScreen);