import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useCountry } from "../../hooks/useCountry";

const container = {
  animate: { transition: { staggerChildren: 0.08 } },
};
const item = {
  initial: { opacity: 0, x: -12 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.3 } },
};

const Detail = () => {
  const { id } = useParams();
  const { data: country, isLoading, isError } = useCountry(id);

  const { name, flag, area, population, continent, subregion, activities } = country || {};

  const rows = [
    { label: "Código", value: id },
    { label: "Continente", value: continent },
    { label: "Subregión", value: subregion || "—" },
    { label: "Área", value: area ? `${area.toLocaleString()} km²` : "—" },
    { label: "Población", value: population ? population.toLocaleString() : "—" },
  ];

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-brand-amber border-t-transparent rounded-full animate-spin" />
      </div>
    );

  if (isError)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-400">No se pudo cargar el país.</p>
      </div>
    );

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed flex items-center justify-center px-4 py-10"
      style={{
        backgroundImage:
          "url('https://static.nationalgeographic.es/files/styles/image_3200/public/02-map-day-launch.adapt_.1900.1.jpg')",
      }}
    >
      <motion.div
        className="flex flex-col md:flex-row gap-6 md:gap-8 items-center bg-navy/80 backdrop-blur-sm rounded-2xl shadow-2xl p-5 sm:p-8 max-w-3xl w-full"
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {/* Flag */}
        <motion.div
          className="flex-shrink-0 w-full md:w-auto"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <img
            src={flag}
            alt={`Bandera de ${name}`}
            className="w-full md:w-64 h-44 object-cover rounded-xl shadow-lg border-2 border-white/20"
            onError={(e) => { e.target.src = "https://flagcdn.com/w320/un.png"; }}
          />
        </motion.div>

        {/* Info */}
        <motion.div className="flex-1 w-full" variants={container} initial="initial" animate="animate">
          <motion.h2 variants={item} className="text-3xl font-bold text-white mb-4">{name}</motion.h2>

          <dl className="space-y-2">
            {rows.map(({ label, value }) => (
              <motion.div key={label} variants={item} className="flex items-baseline gap-2">
                <dt className="text-brand-amber text-sm font-semibold w-28 flex-shrink-0">{label}</dt>
                <dd className="text-white/90 text-sm">{value}</dd>
              </motion.div>
            ))}
          </dl>

          <motion.div variants={item} className="mt-5">
            <p className="text-brand-amber text-sm font-semibold mb-2">Actividades turísticas</p>
            {activities && activities.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {activities.map((a) => (
                  <span
                    key={a.name}
                    className="bg-brand-sky/20 text-brand-sky text-xs font-semibold px-3 py-1 rounded-full border border-brand-sky/40"
                  >
                    {a.name}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-white/50 text-sm italic">Sin actividades creadas aún</p>
            )}
          </motion.div>
        </motion.div>

      </motion.div>
    </div>
  );
};

export default Detail;
