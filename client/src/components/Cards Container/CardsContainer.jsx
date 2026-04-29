import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "../index";
import { setCurrentPage } from "../../redux/actions";
import { useCountries } from "../../hooks/useCountries";

const ITEMS_PER_PAGE = 10;

const CardsContainer = () => {
  const dispatch = useDispatch();
  const { currentPage, continentFilter, activityFilter, sortBy, searchName } = useSelector(
    (state) => state
  );
  const { data: countries = [], isLoading, isError } = useCountries(searchName);

  const displayed = useMemo(() => {
    let list = [...countries];

    if (continentFilter)
      list = list.filter((c) => c.continent === continentFilter);

    if (activityFilter)
      list = list.filter((c) => c.activities?.some((a) => a.name === activityFilter));

    if (sortBy === "A-Z") list.sort((a, b) => a.name.localeCompare(b.name));
    else if (sortBy === "Z-A") list.sort((a, b) => b.name.localeCompare(a.name));
    else if (sortBy === "Mayor Población") list.sort((a, b) => b.population - a.population);
    else if (sortBy === "Menor Población") list.sort((a, b) => a.population - b.population);

    return list;
  }, [countries, continentFilter, activityFilter, sortBy]);

  const totalPages = Math.ceil(displayed.length / ITEMS_PER_PAGE);
  const currentCards = displayed.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const goTo = (page) => dispatch(setCurrentPage(page));

  const pageButtons = [];
  const start = Math.max(1, currentPage - 2);
  const end = Math.min(totalPages, currentPage + 2);
  for (let i = start; i <= end; i++) {
    pageButtons.push(
      <button
        key={i}
        onClick={() => goTo(i)}
        className={`w-9 h-9 rounded-full text-sm font-bold transition-colors duration-200 ${
          currentPage === i ? "bg-brand-amber text-navy" : "bg-navy/70 text-white hover:bg-navy-light"
        }`}
      >
        {i}
      </button>
    );
  }

  if (isLoading)
    return (
      <div className="flex justify-center items-center py-20">
        <div className="w-12 h-12 border-4 border-brand-amber border-t-transparent rounded-full animate-spin" />
      </div>
    );

  if (isError)
    return (
      <p className="text-center text-red-400 py-20">
        No se encontró el país buscado.
      </p>
    );

  return (
    <div className="pb-6">
      <motion.div
        className="flex flex-wrap gap-5 justify-center px-4 py-6"
        variants={{ animate: { transition: { staggerChildren: 0.05 } } }}
        initial="initial"
        animate="animate"
        key={currentPage}
      >
        <AnimatePresence>
          {currentCards.map((country) => (
            <motion.div
              key={country.id}
              variants={{
                initial: { opacity: 0, y: 20, scale: 0.95 },
                animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.3 } },
              }}
            >
              <Card {...country} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <div className="flex items-center justify-center gap-2 mt-2">
        {currentPage > 1 && (
          <motion.button
            onClick={() => goTo(currentPage - 1)}
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            className="px-4 py-2 rounded-lg bg-navy/70 text-white text-sm font-bold hover:bg-brand-amber hover:text-navy transition-colors duration-200"
          >
            ← Anterior
          </motion.button>
        )}
        {pageButtons}
        {currentPage < totalPages && (
          <motion.button
            onClick={() => goTo(currentPage + 1)}
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            className="px-4 py-2 rounded-lg bg-navy/70 text-white text-sm font-bold hover:bg-brand-amber hover:text-navy transition-colors duration-200"
          >
            Siguiente →
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default CardsContainer;
