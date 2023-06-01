import { Link } from "react-router-dom";
import { SearchBar } from "../index";

const NavBar = () => {
  return (
    <div>
      <Link to="/home">Volver a la página principal</Link>
      <hr/>
      <Link to="/form">Crear Actividad</Link>
      <SearchBar />
      <Link to="/">Salir de la aplicación</Link>
    </div>
  );
};

export default NavBar;
