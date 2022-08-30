import { BrowserRouter} from 'react-router-dom';
import Header from './MainPage/components/Header';
import Footer from './MainPage/components/Footer';
import styles from './MainPage/Page.module.css';
import { Router } from './Router/Router';


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
