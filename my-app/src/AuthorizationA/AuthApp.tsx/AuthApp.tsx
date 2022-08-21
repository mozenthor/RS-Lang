import { createContext } from "react";
import { LoginForm } from "../components/loginForm";
import { Logout } from "../components/logout";
import { RegistrationForm } from "../components/RegistratonForm";
import { Store} from "../store/store";

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
        <RegistrationForm></RegistrationForm>
        <LoginForm></LoginForm>
        <Logout></Logout>
    </Context.Provider>
  )
}