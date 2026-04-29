import { NavLink } from "react-router-dom";
import { SearchBar } from "../index";

const NavBar = () => {
  const linkClass = ({ isActive }) =>
    `text-sm font-semibold tracking-wide transition-colors duration-200 px-2 py-1 rounded ${
      isActive
        ? "text-brand-amber border-b-2 border-brand-amber"
        : "text-white/80 hover:text-brand-amber"
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-navy/90 backdrop-blur-sm shadow-lg">
      {/* Fila superior: links + salir */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-2">
        <div className="flex items-center gap-4 sm:gap-6">
          <NavLink to="/home" className={linkClass}>🌍 Inicio</NavLink>
          <NavLink to="/form" className={linkClass}>➕ Nueva Actividad</NavLink>
        </div>
        <NavLink
          to="/"
          className="text-sm font-semibold text-white/60 hover:text-red-400 transition-colors duration-200"
        >
          Salir ×
        </NavLink>
      </div>
      {/* Fila inferior: buscador (full width en mobile) */}
      <div className="flex justify-center px-4 sm:px-6 pb-2">
        <SearchBar />
      </div>
    </nav>
  );
};

export default NavBar;
