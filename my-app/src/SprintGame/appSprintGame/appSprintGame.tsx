import { FC, useContext } from "react";
import { Context } from "./index";
import { observer } from "mobx-react-lite"
import StartScreen from "../components/StartScreen";
import MainGame from "../components/mainGame";
import GameStats from "../components/GameStats";

const AppSprint: FC = () => {
  const { store } = useContext(Context)

  if (store.state === 'startScreen') {
    return (
        <StartScreen></StartScreen>
    )
  } if (store.state === 'mainGame') {
    return (
      <MainGame></MainGame>
    )
  } if (store.state === 'stats') {
    return (
      <GameStats></GameStats>
    )
  }
  return(
    <div>
      dont have any STATE for store!
    </div>
  )
}

export default observer(AppSprint);