import { BrowserRouter} from 'react-router-dom';
import Header from './MainPage/components/Header';
import Footer from './MainPage/components/Footer';
import styles from './MainPage/Page.module.css';
import { Router } from './Router/Router';
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
        <Router />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
