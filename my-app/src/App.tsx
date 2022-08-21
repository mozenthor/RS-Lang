import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthApp } from "./AuthorizationA/AuthApp.tsx/AuthApp";
import ETextBook from "./Etextbook/ETextBook";

function App() {
  return (
    <div>
    
    <BrowserRouter>
          <Routes>
            <Route path={'/authorization'} element = {<AuthApp />} />
          </Routes>
          <Routes>
            <Route path={'/textbook/:group/:page'} element = {<ETextBook />} />
          </Routes>
          <Routes>
            <Route path={'/textbook/'} element = {<ETextBook />} />
          </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
