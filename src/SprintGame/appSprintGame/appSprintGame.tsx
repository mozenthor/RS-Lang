import { FC, useContext } from "react";
import { Context } from "./index";
import { observer } from "mobx-react-lite"
import StartScreen from "../components/StartScreen";
import MainGame from "../components/mainGame";
import GameStats from "../components/GameStats";
import { useParams } from "react-router-dom";

const AppSprint: FC = () => {
  const { store } = useContext(Context)

  const params = useParams<{group: string, page:string}>();

  if(params.group && params.page) {
    store.group = params.group;
    store.page = params.page;
    store.isTextBook = true;
  } else {
    store.setRandomPage()
  }

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