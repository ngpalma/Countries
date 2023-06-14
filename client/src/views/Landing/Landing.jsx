import { Link } from "react-router-dom";
import styles from "./Landing.module.css";

const Landing = () => {
  return (
    <div className={styles.ppalContainer}>
      <h1>APLICACIÓN DE PAÍSES</h1>

      <Link to="/home">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/0/0f/Globo_terraqueo_3.gif"
          alt="Mapa mundi"
        />
      </Link>
      <div className={styles.linksDiv}>
        <h2>Por Nicolás Palma</h2>
        <Link to="https://www.linkedin.com/in/nicol%C3%A1s-palma-137541b0/" target="_blank">
          <img
            src="https://www.pngplay.com/wp-content/uploads/12/LinkedIn-No-Background.png"
            alt="LinkedIn"
          />
        </Link>
        <Link to="https://github.com/ngpalma" target="_blank">
          <img
            src="https://pngimg.com/d/github_PNG83.png"
            alt="GitHub"
          />
        </Link>
        <Link to="mailto:nicolasgerardopalma@gmail.com" target="_blank">
<img src="https://cdn.onlinewebfonts.com/svg/img_432958.png" alt="Gmail"/>
        </Link>
      </div>
    </div>
  );
};

export default Landing;
