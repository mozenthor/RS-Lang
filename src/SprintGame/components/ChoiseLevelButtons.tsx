import { observer } from "mobx-react-lite";
import { FC, useContext } from "react";
import { Context } from "../appSprintGame";
import ChoiseLevelButton from "./ChoiseLevelButton";

const ChoiseLevelButtons: FC = () => {
  const { store } = useContext(Context);

  return (
    <div className="sprint__start-buttons">
      {store.ChoiseButtonsPropsArray.map((el) => <ChoiseLevelButton ChoiseButton = {el} key = {el.group}/>)}
    </div>
  )
}

export interface ILevelButtonProps {
  level: string,
  group: string,
  color: string,
  activeColor: string
}

export interface ILevelButton {
  ChoiseButton: ILevelButtonProps
}

export default observer(ChoiseLevelButtons);