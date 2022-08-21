import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthApp } from "./AuthorizationA/AuthApp.tsx/AuthApp";
import { Dictionary } from "./Etextbook/Components/Dictionary/Dictionary";
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
          <Routes>
            <Route path={'/textbook/dictionary'} element = {<ETextBook> <Dictionary /> </ETextBook>} />
          </Routes>
          
    </BrowserRouter>
    </div>
  );
}

export default App;
