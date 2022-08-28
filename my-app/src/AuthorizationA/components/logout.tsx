import { observer } from "mobx-react-lite";
import { FC, useContext } from "react"
import { Context } from "../AuthApp.tsx/AuthApp"

const Logout: FC = () => {
  const {store} = useContext(Context);
  
  return (
    <button
    className={'auth_button'}
    onClick={() => store.logout()}>
        Выйти
    </button>

  )
}

export default observer(Logout);