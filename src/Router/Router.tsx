import { useEffect, useState } from "react"
import { Routes, Route, Navigate, useNavigate } from "react-router-dom"
import AudioCall from "../Audiocall/AudioCall"
import { AuthApp } from "../AuthorizationA/AuthApp.tsx/AuthApp"
import { Dictionary } from "../Etextbook/Components/Dictionary/Dictionary"
import ETextBook from "../Etextbook/ETextBook"
import MainPage from "../MainPage/MainPage"
import { checkAuth } from "../service/service"
import { SprintGameApp } from "../SprintGame/appSprintGame"
import { Stats } from "../Stats/Stats"
import { checkLogin, removeUserData } from "../util/util"

export const Router: React.FC = () => {
    const [isAuth, setAuth] = useState(checkLogin());
    const navigate = useNavigate();

    async function checkUserData() {
      try {
        if(checkLogin()) {
          await checkAuth();
        }
        setAuth(true);
      } catch(error) {
        setAuth(false);
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
    }, [])
    return (
        isAuth ? <Routes>
          <Route path={'/'} element={<MainPage />} />
          <Route path={'/authorization'} element={<AuthApp />} />
          <Route path={'/textbook/:group/:page'} element={<ETextBook />} />
          <Route path={'/textbook/'} element={<ETextBook />} />
          <Route path={'/textbook/dictionary'} element = {<ETextBook> <Dictionary /> </ETextBook>} />
          <Route path={'/stats'} element = {<Stats />} />
          <Route path={'/sprint'} element={<SprintGameApp />} />
          <Route path={'/audiocall'} element={<AudioCall />} />
          <Route path={'/audiocall/:group/:page'} element={<AudioCall />} />
          <Route path="*" element={<Navigate to ="/" />}/>
        </Routes> :
        <Routes>
          <Route path={'/'} element={<MainPage />} />
          <Route path={'/authorization'} element={<AuthApp />} />
          <Route path={'/textbook/:group/:page'} element={<ETextBook />} />
          <Route path={'/textbook/'} element={<ETextBook />} />
          <Route path={'/sprint'} element={<SprintGameApp />} />
          <Route path={'/audiocall'} element={<AudioCall />} />
          <Route path="*" element={<Navigate to ="/authorization" />}/>
          
        </Routes>
    )
}