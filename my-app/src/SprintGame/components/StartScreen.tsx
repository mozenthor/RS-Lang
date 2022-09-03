import { observer } from "mobx-react-lite";
import { FC, useContext } from "react";
import { Context } from "../appSprintGame";
import ChoiseLevelButtons from "./ChoiseLevelButtons";

const StartScreen: FC = () => {
  const {store} = useContext(Context);

  return (
    <div  className="sprint__wrapper">
      <h1>Спринт</h1>
      <div className="sprint__description">В этой игре вам необходимо определить соответсвует ли перевод предложенному слову за отведенное время</div>
      <div>Выберите уровень сложности:</div>
      <ChoiseLevelButtons></ChoiseLevelButtons>
      <button
        className="sprint__start-button"
        onClick={() => {
          store.randomParaSlov();
          store.setState('mainGame');
          store.startTime = new Date().getTime();
          store.timer();
        }}
      >
        Начать
      </button>
    </div>
  )
}

export default observer(StartScreen);