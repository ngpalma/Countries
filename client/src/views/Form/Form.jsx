import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "sonner";
import validate from "../validate";
import { useCountries } from "../../hooks/useCountries";

const inputClass =
  "w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm placeholder:text-white/40 outline-none focus:border-brand-amber transition-colors";

const postActivity = async (form) => {
  const { data } = await axios.post("/activities", form);
  return data;
};

const Form = () => {
  const navigate = useNavigate();
  const { data: countries = [] } = useCountries();
  const countryOrder = [...countries].sort((a, b) => a.name.localeCompare(b.name));

  const [form, setForm] = useState({
    name: "",
    difficulty: "",
    season: "",
    duration: "",
    countries: [],
  });
  const [errors, setErrors] = useState({});

  const mutation = useMutation({
    mutationFn: postActivity,
    onSuccess: () => {
      toast.success("¡Actividad creada correctamente!");
      setTimeout(() => navigate("/home"), 1200);
    },
    onError: () => {
      toast.error("Ocurrió un error al crear la actividad.");
    },
  });

  const handleChange = ({ target: { name, value } }) => {
    const updated = { ...form, [name]: value };
    setForm(updated);
    setErrors(validate(updated));
  };

  const handleSelectChange = ({ target: { value } }) => {
    const selected = form.countries;
    setForm({
      ...form,
      countries: selected.includes(value)
        ? selected.filter((c) => c !== value)
        : [...selected, value],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(form);
  };

  const selectedNames = form.countries.map(
    (id) => countryOrder.find((c) => c.id === id)?.name || id
  );

  const isValid =
    form.name && form.difficulty && form.season && form.duration &&
    form.countries.length > 0 &&
    !errors.name && !errors.difficulty && !errors.season && !errors.duration;

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed flex items-center justify-center px-4 py-10"
      style={{ backgroundImage: "url('https://images6.alphacoders.com/400/400645.jpg')" }}
    >
      <motion.div
        className="w-full max-w-lg bg-navy/85 backdrop-blur-sm rounded-2xl shadow-2xl p-5 sm:p-8 border border-white/10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Nueva Actividad Turística</h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="text-brand-amber text-sm font-semibold block mb-1">Nombre de la actividad</label>
            <input type="text" name="name" placeholder="Ej: Senderismo en montaña"
              value={form.name} onChange={handleChange} className={inputClass} />
            {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="text-brand-amber text-sm font-semibold block mb-1">Dificultad (1–5)</label>
            <input type="number" name="difficulty" placeholder="Ingrese un número del 1 al 5"
              value={form.difficulty} onChange={handleChange} min="1" max="5" className={inputClass} />
            {errors.difficulty && <p className="text-red-400 text-xs mt-1">{errors.difficulty}</p>}
          </div>

          <div>
            <label className="text-brand-amber text-sm font-semibold block mb-1">Temporada</label>
            <select name="season" value={form.season} onChange={handleChange}
              className={`${inputClass} cursor-pointer`}>
              <option value="" hidden>Selecciona una estación</option>
              {["Verano", "Otoño", "Invierno", "Primavera"].map((t) => (
                <option key={t} value={t} className="bg-navy text-white">{t}</option>
              ))}
            </select>
            {errors.season && <p className="text-red-400 text-xs mt-1">{errors.season}</p>}
          </div>

          <div>
            <label className="text-brand-amber text-sm font-semibold block mb-1">Duración (horas)</label>
            <input type="number" name="duration" placeholder="Ej: 3"
              value={form.duration} onChange={handleChange} min="1" className={inputClass} />
            {errors.duration && <p className="text-red-400 text-xs mt-1">{errors.duration}</p>}
          </div>

          <div>
            <label className="text-brand-amber text-sm font-semibold block mb-1">
              Países donde se puede realizar
            </label>
            <select name="countries" multiple value={form.countries} onChange={handleSelectChange}
              className={`${inputClass} h-36 cursor-pointer`}>
              {countryOrder.map((c) => (
                <option key={c.id} value={c.id} className="bg-navy text-white py-0.5">{c.name}</option>
              ))}
            </select>
            {selectedNames.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {selectedNames.map((n) => (
                  <span key={n} className="bg-brand-amber/20 text-brand-amber text-xs px-2 py-0.5 rounded-full border border-brand-amber/40">
                    {n}
                  </span>
                ))}
              </div>
            )}
            {errors.countries && <p className="text-red-400 text-xs mt-1">{errors.countries}</p>}
          </div>

          {isValid && (
            <motion.button
              type="submit"
              disabled={mutation.isPending}
              className="w-full py-2.5 rounded-lg bg-brand-amber text-navy font-bold text-sm hover:bg-yellow-400 transition-colors duration-200 disabled:opacity-60"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {mutation.isPending ? "Creando..." : "Crear Actividad"}
            </motion.button>
          )}
        </form>
      </motion.div>
    </div>
  );
};

export default Form;
