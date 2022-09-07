import { observer } from "mobx-react-lite";
import { FC, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../appSprintGame";
import GameResults from "../components/results";

const GameStats: FC = () => {
  const { store } = useContext(Context);

  return (
    <div className="sprint__wrapper">
      <h3 
        style={{marginBottom: 'auto'}}
      >Ваши результаты:</h3>
      <div className="sprint__stats">
        <div>
          <h5>Правильные ответы:</h5>
          {store.guessedWords.map((el, index) => <GameResults word={`${el.word} - ${el.wordTranslate}`} key={index} />)}
        </div>
        <div>
          <h5>Неправильные ответы:</h5>
          {store.notGuessedWords.map((el, index) => <GameResults word={`${el.word} - ${el.wordTranslate}`} key={index} />)}
        </div>
      </div>
      <div 
        className="sprint__stats_buttons"
        style={{marginTop: 'auto'}}
      >
        <button
          className="sprint__start-button"
          onClick={() => {
            store.setState('startScreen');
            store.unsetParams();
          }}
        >
          Играть ещё раз
        </button>
        <Link 
          to='/textbook'
          className="sprint__start-button"
          onClick={() => {
            store.setState('startScreen');
            store.unsetParams();
            
          }}
          >
            Перейти в учебник
          </Link>
      </div>
    </div>
  );
}

export default observer(GameStats);