import { observer } from "mobx-react-lite";
import { FC, useContext, useState } from "react";
import { Context } from "../AuthApp.tsx/AuthApp";

const LoginForm: FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const {store} = useContext(Context);
  
  return (
    <div
    className={'auth_form'}
    >
      <input 
        className={'auth_input'}
        onChange={e => setEmail(e.target.value)}
        value = {email}
        type="email"
        placeholder='Введите адрес электронной почты'
      />
      <input
      className={'auth_input'}
        onChange={e => setPassword(e.target.value)}
        value = {password}
        type="password"
        placeholder='Введите пароль'
      />
      <button
        className={'auth_button'}
        onClick={() => store.login(email, password)}>
        Войти
      </button>
    </div>
  )
}

export default observer(LoginForm);