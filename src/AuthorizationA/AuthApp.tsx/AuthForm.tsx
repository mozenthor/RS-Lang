import { observer } from "mobx-react-lite";
import { FC, useContext, useEffect } from "react";
import UserMessage from "../components/ErrorMessage";
import LoginForm from "../components/loginForm";
// import Logout from "../components/logout";
import RegistrationForm from "../components/RegistratonForm";

import { Context } from "./AuthApp";

const AuthForm: FC = () => {
  const { store } = useContext(Context);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.setAuth(true);
    }
  }, [])

  // if (store.isAuth) {
  //   return (
  //     <div>
  //       Добро пожаловать, {localStorage.getItem('userName')}
  //       <Logout></Logout>
  //     </div>
  //   )
  // }

  if (store.isLoginRegistration) {
    return (
      <div className="auth_wrapper">
        <div className="auth_text">
          Войдите в свой аккаунт
        </div>
        <LoginForm></LoginForm>
        <UserMessage></UserMessage>
        <div className="auth_line"></div>
        <div className="auth_form">
          <div className="auth_text">
            Ещё не создали аккаунт?
          </div>
          <button
            className="auth_button"
            onClick={() => store.setLogReg(false)}
          >
            Регистрация
          </button>
        </div>
      </div>
    )
  } else {
    return (
      <div>
        <div className="auth_text">
          Зарегистрируйтесь
        </div>
        <RegistrationForm></RegistrationForm>
        <UserMessage></UserMessage>
        <div className="auth_line"></div>
        <div className="auth_form">
          <div className="auth_text">
            Уже есть аккаунт?
          </div>
          <button
            className="auth_button"
            onClick={() => store.setLogReg(true)}
          >
          Войти
        </button>
        </div>
        
      </div>
    )
  }

}

export default observer(AuthForm);