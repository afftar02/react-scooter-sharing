import React from "react";
import Home from "./pages/Home";
import Header from "./components/Header";
import { Route, Routes } from 'react-router-dom';
import { Authorization } from "./pages/Authorization/Authorization";
import { Registration } from "./pages/Registration/Registration";
import { User } from "./pages/User/User";

export const AppContext = React.createContext({});

function App() {

  const [ userId, setUserId ] = React.useState();  
  const [ access_token, setAccess_token ] = React.useState();
  const [ refresh_token, setRefresh_token ] = React.useState();

  return (
    <AppContext.Provider value={{ userId, setUserId, access_token, setAccess_token, refresh_token, setRefresh_token }}>
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
    </AppContext.Provider>
  );
}

export default App;
