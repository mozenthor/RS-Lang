import { observer } from "mobx-react-lite";
import { FC, useContext } from "react";
import { Context } from "../AuthApp.tsx/AuthApp";

const UserMessage: FC = () => {
  const {store} = useContext(Context);

  if(store.message) {
    return (
      <div className="auth_error">
        {store.message}
      </div>
    )
  }

  return (
    <div></div>
  )
}

export default observer(UserMessage);