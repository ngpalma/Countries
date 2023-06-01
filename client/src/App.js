import { Home, Form, Detail, Landing } from "./views/index.js";
import { NavBar } from "./components/index.js";
import { Routes, Route, useLocation } from "react-router-dom";

function App() {
  const location = useLocation();

  return (
    <div className="App">
      <div>{location.pathname !== "/" && <NavBar />}</div>

      <Routes>
        <Route exact path="/" element={<Landing />} />

        <Route path="/home" element={<Home />} />

        <Route path="/detail/:id" element={<Detail />} />

        <Route path="/form" element={<Form />} />
      </Routes>
    </div>
  );
}

export default App;
