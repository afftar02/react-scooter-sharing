import Home from "./pages/Home";
import Header from "./components/Header";
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="wrapper">
      <Header />
      <Routes>
        <Route
          exact path="/home"
          element={<Home />}
        />
      </Routes>
    </div>
  );
}

export default App;
