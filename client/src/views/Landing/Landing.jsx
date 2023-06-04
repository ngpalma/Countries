import { Link } from "react-router-dom";
import styles from "./Landing.module.css";
import globo from "./Images/Globo_terraqueo_3.gif";

const Landing = () => {
  return (
    <div className={styles.ppalContainer}>
      <h1>Aplicación de paises</h1>

      <Link to="/home">
        <img src={globo} alt="Mapa mundi" />
      </Link>

      <h2>Por Nicolás Palma</h2>
    </div>
  );
};

export default Landing;
