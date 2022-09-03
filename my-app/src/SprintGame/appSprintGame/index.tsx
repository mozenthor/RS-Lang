import "./sprintStyle.css"
import { createContext } from "react";
import { Store } from "../store/store";
import AppSprint from "./appSprintGame"

const store = new Store();

export const Context = createContext<State>({
  store,
})

interface State {
  store: Store,
}

export const SprintGameApp = () => {
  return (
    <Context.Provider value={{
      store
      }}>
        <AppSprint/>
    </Context.Provider>
  )
}