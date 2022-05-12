import Home from "./pages/Home";
import Header from "./components/Header";
import { Route, Routes } from 'react-router-dom';
import { Authorization } from "./pages/Authorization/Authorization";
import { Registration } from "./pages/Registration/Registration";
import { User } from "./pages/User/User";

function App() {
  return (
    <div className="wrapper">
      <Header />
      <Routes>
        <Route
          exact path="/"
          element={<Authorization />}
        />
        <Route
          exact path="/home"
          element={<Home />}
        />
        <Route
          exact path="/registration"
          element={<Registration />}
        />
        <Route
          exact path="/user"
          element={<User />}
        />
      </Routes>
    </div>
  );
}

export default App;
