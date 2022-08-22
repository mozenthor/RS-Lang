import { FC } from "react"
import { store } from "../AuthApp.tsx/AuthApp"

export const Logout: FC = () => {

  return (
    <button onClick={() => store.logout()}>
        Выйти
    </button>

  )
}