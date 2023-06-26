import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import validate from "../validate";
import { getAllCountries } from "../../redux/actions";
import style from "./Form.module.css";

const Form = () => {
  const country = useSelector((state) => state.allCountries);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllCountries());
  }, [dispatch]);

  const [form, setForm] = useState({
    name: "",
    difficulty: "",
    season: "",
    duration: "",
    countries: [],
  });

  const [errors, setErrors] = useState({
    name: "",
    difficulty: "",
    season: "",
    duration: "",
    countries: [],
  });

  const handleSelectChange = (event) => {
    const value = event.target.value;
    const selectedCountries = form.countries;
    if (selectedCountries.includes(value)) {
      setForm({
        ...form,
        countries: selectedCountries.filter((c) => c !== value),
      });
    } else {
      setForm({ ...form, countries: [...selectedCountries, value] });
    }
  };

  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    setForm({ ...form, [property]: value });
    setErrors(validate({ ...form, [property]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("/activities", form)
      .then((res) => {
        alert("Actividad creada correctamente");
        navigate("/home");
      })
      .catch((err) => {
        alert("Ocurrió un error durante la creación");
        navigate("/home");
      });
    setForm({
      name: "",
      difficulty: "",
      season: "",
      duration: "",
      countries: [],
    });
  };

  const encontrarId = (id) => {
    const guardar = country.find((c) => c.id === id);
    return guardar.name;
  };

  const arrayName = form.countries.map((e) => encontrarId(e));

  return (
    <div className={style.ppalForm}>
      <form onSubmit={handleSubmit}>
        {/* NOMBRE DE LA ACTIVIDAD */}
        <label htmlFor="name">
          <p>Nombre de la actividad turística:</p>
          <input
            type="text"
            name="name"
            placeholder="Ingrese una actividad..."
            value={form.name}
            onChange={handleChange}
          />
          {errors.name && <span>{errors.name}</span>}
        </label>

        {/* DIFICULTAD */}
        <label htmlFor="difficulty">
          <p>Dificultad:</p>
          <input
            type="number"
            name="difficulty"
            placeholder="Ingrese un número del 1 al 5..."
            value={form.difficulty}
            onChange={handleChange}
          />
          {errors.difficulty && <span>{errors.difficulty}</span>}
        </label>

        {/* TEMPORADA */}
        <label htmlFor="season">
          <p>Temporada:</p>
          <input
            type="text"
            name="season"
            placeholder="Ingrese una estación o temporada del año..."
            value={form.season}
            onChange={handleChange}
            hidden
          />
          <select name="season" value={form.season} onChange={handleChange}>
          <option value="" key="first" hidden>Selecciona una opción</option>

            {["Verano", "Otoño", "Invierno", "Primavera"].map((t, i) => (
              <option value={t} key={i}>
                {t}
              </option>
            ))}
          </select>
          {errors.season && <span>{errors.season}</span>}
        </label>

        {/* DURACION */}
        <label htmlFor="duration">
          <p>Duración:</p>
          <input
            type="number"
            name="duration"
            placeholder="Ingrese la duración de la actividad en horas..."
            value={form.duration}
            onChange={handleChange}
          />
          {errors.duration && <span>{errors.duration}</span>}
        </label>

        {/* PAISES */}
        <label htmlFor="countries">
          <p>Paises donde se pueda realizar:</p>
          <input
            type="text"
            name="countries"
            placeholder="Seleccione uno o más paises"
            value={arrayName}
            onChange={handleChange}
          />
          <select
            name="countries"
            multiple={true}
            value={form.countries}
            onChange={handleSelectChange}
          >
            {country.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          {errors.countries && <span>{errors.countries}</span>}
        </label>
        <br />
        {form.name.length !== 0 &&
          form.difficulty.length !== 0 &&
          form.season.length !== 0 &&
          form.duration.length !== 0 &&
          form.countries.length !== 0 && (
            <div className={style.buttonSubmit}>
              <button type="submit">Crear Actividad</button>
            </div>
          )}
      </form>
    </div>
  );
};

export default Form;
