import { NavLink } from "react-router-dom";
import { SearchBar } from "../index";
import style from "./NavBar.module.css";

const NavBar = () => {
  return (
    <div className={style.navContainer}>
      <NavLink to="/home" className={style.navHome}>Volver a la página principal</NavLink>
      <NavLink to="/form" className={style.navForm}>Crear Actividad Turística</NavLink>
      <SearchBar />
      <NavLink to="/" className={style.navLand}>Salir de la aplicación</NavLink>
    </div>
  );
};

export default NavBar;
