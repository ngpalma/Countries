import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { cleanDetail, getCountryId } from "../../redux/actions";
import style from "./Detail.module.css";

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { name, flag, area, population, continent, subregion, activities } =
    useSelector((state) => state.idCountry);

  console.log(activities, "actividades");
  useEffect(() => {
    dispatch(getCountryId(id));
    return () => {
      dispatch(cleanDetail());
    };
  }, [dispatch, id]);
  return (
    <div className={style.ppalDetail}>
      <div className={style.detailCss}>
        <h2> Nombre: {name} </h2>
        <h3> Id: {id} </h3>
        <h3> Area: {area !== null ? area : "No area"} </h3>
        <h3> Cantidad de habitantes: {population} </h3>
        <h3> Continente: {continent} </h3>
        <h3> Subregión: {subregion} </h3>
        {typeof activities !== "undefined" && activities.length > 0 ? (
          <div>
            <h3> Actividades: {activities.map((a) => a.name).join(", ")} </h3>
          </div>
        ) : (
          <h3>No hay actividades creadas aún</h3>
        )}
      </div>
      <div className={style.imgDetailCss}>
        <img src={flag} alt={`Bandera de ${name}`} />
      </div>
    </div>
  );
};

export default Detail;
