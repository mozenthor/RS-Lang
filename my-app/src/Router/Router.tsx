import { Routes, Route } from "react-router-dom"
import { AuthApp } from "../AuthorizationA/AuthApp.tsx/AuthApp"
import { Dictionary } from "../Etextbook/Components/Dictionary/Dictionary"
import ETextBook from "../Etextbook/ETextBook"
import MainPage from "../MainPage/MainPage"
import { Stats } from "../Stats/Stats"

export const Router: React.FC = () => {
    return (
        <Routes>
          <Route path={'/'} element={<MainPage />} />
          <Route path={'/authorization'} element={<AuthApp />} />
          <Route path={'/textbook/:group/:page'} element={<ETextBook />} />
          <Route path={'/textbook/'} element={<ETextBook />} />
          <Route path={'/textbook/dictionary'} element = {<ETextBook> <Dictionary /> </ETextBook>} />
          <Route path={'/stats'} element = {<Stats />} />
        </Routes>
    )
}