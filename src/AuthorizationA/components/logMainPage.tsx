import { observer } from "mobx-react-lite";
import { FC, useContext } from "react";
import BtnLogin from "../../MainPage/components/BtnLogin";
import { Context } from "../AuthApp.tsx/AuthApp";
import Logout from "./logout";

const LoginLogoutMain: FC = () => {
  const { store } = useContext(Context);

  if(store.isAuth) {
    return (
      <div className="auth__main-page_wrapper">
        <span style={{fontWeight: 500}}>Добро пожаловать,</span> {localStorage.getItem('userName')}
        <Logout></Logout>
      </div>
    )
  } else {
    return(
      <div className="auth__main-page_wrapper">
        <BtnLogin/>
      </div>
    )
  }
}

export default observer(LoginLogoutMain);