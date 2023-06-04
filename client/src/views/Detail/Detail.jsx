import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getCountryId } from "../../redux/actions";

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { name, flag, area, population, continent, subregion, activities } =
    useSelector((state) => state.idCountry);
  useEffect(() => {
    dispatch(getCountryId(id));
  }, [dispatch, id]);
  return (
    <div>
      <h1>Nombre: {name}</h1>
      <h2>Id: {id}</h2>
      <img src={flag} alt={`Bandera de ${name}`} />
      <h2>Area: {area}</h2>
      <h2>Cantidad de habitantes: {population}</h2>
      <h2>Continente: {continent}</h2>
      <h2>Subregión: {subregion}</h2>
      <h2>Actividades:</h2>
      {activities && <h3>{activities.map((a) => a.name).join(", ")}</h3>}
    </div>
  );
};

export default Detail;
