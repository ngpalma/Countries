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
  useEffect(() => {
    dispatch(getCountryId(id));
    return () => {
      dispatch(cleanDetail);
    };
  }, [dispatch, id]);
  return (
    <div className={style.ppalDetail}>
      <div className={style.detailCss}>
        <h2> Nombre: {name} </h2>
        <h3> Id: {id} </h3>
        <h3> Area: {area} </h3>
        <h3> Cantidad de habitantes: {population} </h3>
        <h3> Continente: {continent} </h3>
        <h3> Subregión: {subregion} </h3>
        {activities && (
          <div>
            <h3> Actividades: {activities.map((a) => a.name).join(", ")} </h3>
          </div>
        )}
      </div>
      <div className={style.imgDetailCss}>
        <img src={flag} alt={`Bandera de ${name}`} />
      </div>
    </div>
  );
};

export default Detail;
