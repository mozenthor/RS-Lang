import { observer } from "mobx-react-lite";
import { FC, useContext } from "react";
import { Context } from "../appSprintGame";
import { ILevelButton } from "./ChoiseLevelButtons";

const ChoiseLevelButton: FC<ILevelButton> = (props: ILevelButton) => {
  const { store } = useContext(Context);
  
  return (
    <button
      className="sprint__level-button"
      style={{ backgroundColor: `${props.ChoiseButton.color}`}}
      onClick={() => {
        store.setGroup(props.ChoiseButton.group);
        store.unsetActiveChoiseButton();
        store.setActiveChoiseButton(props.ChoiseButton.activeColor, props.ChoiseButton.group)
      }}
    >
      {props.ChoiseButton.level}
    </button>
  )
}

export default observer(ChoiseLevelButton);