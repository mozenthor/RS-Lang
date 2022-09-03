import { observer } from "mobx-react-lite";
import { FC } from "react"

const GameResults: FC<IgameResults> = (props: IgameResults) => {
  return (
    <div>
      {props.word}
    </div>
  )
}

export default observer(GameResults);

interface IgameResults {
  word: string
  key: number
}