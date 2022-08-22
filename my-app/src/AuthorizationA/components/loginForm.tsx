import { FC, useContext, useState } from "react";
import { Context} from "../AuthApp.tsx/AuthApp";

export const LoginForm: FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const {store} = useContext(Context);
  
  return (
    <div>
      <input
        onChange={e => setEmail(e.target.value)}
        value = {email}
        type="email"
        placeholder='Введите адрес электронной почты'
      />
      <input
        onChange={e => setPassword(e.target.value)}
        value = {password}
        type="password"
        placeholder='Введите пароль'
      />
      <button onClick={() => store.login(email, password)}>
        Войти
      </button>
    </div>
  )
}