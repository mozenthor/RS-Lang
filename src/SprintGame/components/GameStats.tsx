import { observer } from "mobx-react-lite";
import { FC, useContext } from "react";
import { Context } from "../appSprintGame";
import GameResults from "../components/results";

const GameStats: FC = () => {
  const { store } = useContext(Context);

  return (
    <div className="sprint__wrapper">
      FINISH
      <button
        className="sprint__start-button"
        onClick={() => {
          store.setState('startScreen');
          store.usetParams();
        }}
      >
        back
      </button>
      <div>
        Правильные ответы:
        {store.guessedWords.map((el, index) => <GameResults word={`${el.word} - ${el.wordTranslate}`} key={index} />)}
      </div>
      <div>
        Неправильные ответы:
        {store.notGuessedWords.map((el, index) => <GameResults word={`${el.word} - ${el.wordTranslate}`} key={index} />)}
      </div>
    </div>
  );
}

export default observer(GameStats);