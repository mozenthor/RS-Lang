import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ETextBook from './Etextbook/ETextBook';
import Header from './MainPage/components/Header';
import Footer from './MainPage/components/Footer';
import styles from './MainPage/Page.module.css';
import MainPage from './MainPage/MainPage';

import { Dictionary } from "./Etextbook/Components/Dictionary/Dictionary";
import { AuthApp } from './AuthorizationA/AuthApp.tsx/AuthApp';
import { Stats } from './Stats/Stats';
import AudioCall from './Audiocall/AudioCall';
import { SprintGameApp } from './SprintGame/appSprintGame';



function App() {
  return (
    <div className={styles.wrapper}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path={'/'} element={<MainPage />} />
        </Routes>
        <Routes>
          <Route path={'/authorization'} element={<AuthApp />} />
        </Routes>
        <Routes>
          <Route path={'/audiocall'} element={<AudioCall />} />
        </Routes>
        <Routes>
          <Route path={'/textbook/:group/:page'} element={<ETextBook />} />
        </Routes>
        <Routes>
          <Route path={'/textbook/'} element={<ETextBook />} />
        </Routes>
        <Routes>
            <Route path={'/textbook/dictionary'} element = {<ETextBook> <Dictionary /> </ETextBook>} />
        </Routes>
        <Routes>
            <Route path={'/stats'} element = {<Stats />} />
        </Routes>
        <Routes>
            <Route path={'/sprint'} element = {<SprintGameApp />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
