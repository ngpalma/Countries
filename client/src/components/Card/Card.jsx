import { Link } from "react-router-dom";
import style from "./Card.module.css";


const Card = ({ id, flag, name, continent }) => {
  return (
    <div className={style.cardCss}>
      <Link to={`/detail/${id}`}>
        <img className={style.imgCard} src={flag} alt={`Bandera de ${name}`} />
      </Link>
      <h3>{name}</h3>
      <h4>{continent}</h4>
    </div>
  );
};

export default Card;
