import React from "react";
import Home from "./pages/Home/Home";
import Header from "./components/Header";
import { Route, Routes } from 'react-router-dom';
import { Authorization } from "./pages/Authorization/Authorization";
import { Registration } from "./pages/Registration/Registration";
import { User } from "./pages/User/User";
import { NotFound } from "./pages/NotFound/NotFound";

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
        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>
    </div>
  );
}

export default App;
