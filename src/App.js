import React from "react";
import axios from 'axios';
import Home from "./pages/Home/Home";
import Header from "./components/Header";
import { Route, Routes } from 'react-router-dom';
import { Authorization } from "./pages/Authorization/Authorization";
import { Registration } from "./pages/Registration/Registration";
import { User } from "./pages/User/User";
import { NotFound } from "./pages/NotFound/NotFound";

export const AppContext = React.createContext({});

function App() {

  const [userId, setUserId] = React.useState();
  const [access_token, setAccess_token] = React.useState();
  const [refresh_token, setRefresh_token] = React.useState();

  async function refreshTokens() {
    try {
      const { data } = await axios({
        method: 'get',
        url: `http://localhost:8080/scooter-sharing/api/token/refresh`,
        headers: {
          Authorization: refresh_token
        }
      });
      setAccess_token("Bearer " + data.access_token);
      setRefresh_token("Bearer " + data.refresh_token);
    } catch (error) {
      alert('Token refreshing error!');
    }
  }

  return (
    <AppContext.Provider value={{ userId, setUserId, access_token, setAccess_token, setRefresh_token, refreshTokens }}>
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
          <Route
            path="*"
            element={<NotFound />}
          />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
