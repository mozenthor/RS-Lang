import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ETextBook from './Etextbook/ETextBook';
import Header from './MainPage/components/Header';
import Footer from './MainPage/components/Footer';
import styles from './MainPage/Page.module.css';
import MainPage from './MainPage/MainPage';
import AuthApp from './pages/authorization';

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
          <Route path={'/textbook/:group/:page'} element={<ETextBook />} />
        </Routes>
        <Routes>
          <Route path={'/textbook/'} element={<ETextBook />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
