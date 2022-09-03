import { useEffect, useState } from "react"
import { Routes, Route, Navigate, useNavigate } from "react-router-dom"
import { AuthApp } from "../AuthorizationA/AuthApp.tsx/AuthApp"
import { Dictionary } from "../Etextbook/Components/Dictionary/Dictionary"
import ETextBook from "../Etextbook/ETextBook"
import MainPage from "../MainPage/MainPage"
import { checkAuth, updateStats } from "../service/service"
import { Stats } from "../Stats/Stats"
import { checkLogin, removeUserData } from "../util/util"

export const Router: React.FC = () => {
    const [isAuth, setAuth] = useState(checkLogin());
    const navigate = useNavigate();

    async function checkUserData() {
      try {
        if(checkLogin()) {
          console.log('1');
          await checkAuth();
          console.log('2');
        }
        console.log('3');
        setAuth(true);
      } catch(error) {
        setAuth(false);
        console.log('сработала ошибка');
        removeUserData();
        navigate('/authorization');
      }
    }

    useEffect(() => {
      // checkUserData();
      if(checkLogin()) setAuth(true);
      else setAuth(false);
    },[navigate]);
    useEffect(() => {
      checkUserData();
      console.log('сработало');
    }, [])
    return (
        isAuth ? <Routes>
          <Route path={'/'} element={<MainPage />} />
          <Route path={'/authorization'} element={<AuthApp />} />
          <Route path={'/textbook/:group/:page'} element={<ETextBook />} />
          <Route path={'/textbook/'} element={<ETextBook />} />
          <Route path={'/textbook/dictionary'} element = {<ETextBook> <Dictionary /> </ETextBook>} />
          <Route path={'/stats'} element = {<Stats />} />
          <Route path="*" element={<Navigate to ="/" />}/>
        </Routes> :
        <Routes>
          <Route path={'/'} element={<MainPage />} />
          <Route path={'/authorization'} element={<AuthApp />} />
          <Route path={'/textbook/:group/:page'} element={<ETextBook />} />
          <Route path={'/textbook/'} element={<ETextBook />} />
          <Route path="*" element={<Navigate to ="/authorization" />}/>
        </Routes>
    )
}