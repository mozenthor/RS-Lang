import { FC, useState } from "react";
import { store } from "../AuthApp.tsx/AuthApp";

export const RegistrationForm: FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  return (
    <div>
      <input
        onChange={e => setName(e.target.value)}
        value = {name}
        type="name"
        placeholder='Введите ваше имя'
      />
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
      <button onClick={() => store.registration(name, email, password)}>
        Регистрация
      </button>
    </div>
  )
}