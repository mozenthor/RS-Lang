import { observer } from "mobx-react-lite";
import { FC, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../AuthApp.tsx/AuthApp";

const RegistrationForm: FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const {store} = useContext(Context);
  const navigate = useNavigate();
  
  return (
    <div
    className={'auth_form'}
    >
      <input
        className={'auth_input'}
        onChange={e => setName(e.target.value)}
        value = {name}
        type="name"
        placeholder='Введите ваше имя'
        onKeyPress={async (e) => {
          if (e.key === 'Enter'){
            await store.registration(name, email, password);
            if (store.isAuth === true) {
              navigate("/");
            }
          }
        }}
      />
      <input
        className={'auth_input'}
        onChange={e => setEmail(e.target.value)}
        value = {email}
        type="email"
        placeholder='Введите адрес электронной почты'
        onKeyPress={async (e) => {
          if (e.key === 'Enter'){
            await store.registration(name, email, password);
            if (store.isAuth === true) {
              navigate("/");
            }
          }
        }}
      />
      <input
        className={'auth_input'}
        onChange={e => setPassword(e.target.value)}
        value = {password}
        type="password"
        placeholder='Введите пароль'
        onKeyPress={async (e) => {
          if (e.key === 'Enter'){
            await store.registration(name, email, password);
            if (store.isAuth === true) {
              navigate("/");
            }
          }
        }}
      />
      <button
        className={'auth_button'}
        onClick={async () => {
          await store.registration(name, email, password);
          if (store.isAuth === true) {
            navigate("/");
          }
          }}>
        Регистрация
      </button>
    </div>
  )
}

export default observer(RegistrationForm);