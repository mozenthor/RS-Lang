import "./authStyle.css"
import { createContext } from "react";
import { Store} from "../store/store";
import AuthForm from "./AuthForm";

export const store = new Store();

export const Context = createContext<State>({
  store,
})

interface State {
  store: Store,
}

export const AuthApp = () => {
  return (
    <Context.Provider value={{
      store
      }}>
        <AuthForm/>
    </Context.Provider>
  )
}

