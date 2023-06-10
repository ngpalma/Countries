import { Link } from "react-router-dom";
import { SearchBar } from "../index";
import style from "./NavBar.module.css";


const NavBar = () => {
  return (
    <div className={style.navContainer}>
      <Link to="/home">Volver a la página principal</Link>
      
      <Link to="/form">Crear Actividad</Link>
      <SearchBar />
      <Link to="/">Salir de la aplicación</Link>
    </div>
  );
};

export default NavBar;
