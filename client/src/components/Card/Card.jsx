import { Link } from "react-router-dom";

const Card = ({ id, flag, name, continent }) => {
  return (
    <div>
      <Link to={`/detail/${id}`}>
        <img src={flag} alt={`Bandera de ${name}`} />
      </Link>
      <h3>{name}</h3>
      <h4>{continent}</h4>
    </div>
  );
};

export default Card;
