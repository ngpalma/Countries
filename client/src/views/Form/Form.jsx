import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import validate from "../validate";
import { getAllCountries } from "../../redux/actions";

const Form = () => {
  const country = useSelector((state) => state.allCountries);

  const dispatch = useDispatch();

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
      .post("http://localhost:3001/activities", form)
      .then((res) => alert("Actividad creada correctamente"))
      .catch((err) => alert(err));
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
    <form onSubmit={handleSubmit}>
      {/* NOMBRE DE LA ACTIVIDAD */}
      <label htmlFor="name">
        <p>Nombre de la actividad:</p>
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
        />
        {errors.season && <span>{errors.season}</span>}
      </label>

      {/* DURACION */}
      <label htmlFor="duration">
        <p>Duración:</p>
        <input
          type="text"
          name="duration"
          placeholder="Ingrese la duración de la actividad en horas..."
          value={form.duration}
          onChange={handleChange}
        />
        {errors.duration && <span>{errors.duration}</span>}
      </label>

      {/* PAISES */}
      <label htmlFor="countries">
        <p>Paises:</p>
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
      <button type="submit">Crear Actividad</button>
    </form>
  );
};

export default Form;
