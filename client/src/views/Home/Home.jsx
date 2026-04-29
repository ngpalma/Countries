import { useDispatch, useSelector } from "react-redux";
import {
  setContinentFilter,
  setActivityFilter,
  setSort,
  clearFilters,
  setCurrentPage,
} from "../../redux/actions";
import { useActivities } from "../../hooks/useActivities";
import { CardsContainer } from "../../components/index";

const selectClass =
  "w-full sm:w-auto bg-navy/80 text-white text-sm rounded-lg px-3 py-1.5 border border-white/20 outline-none cursor-pointer hover:border-brand-amber focus:border-brand-amber transition-colors";

const Home = () => {
  const dispatch = useDispatch();
  const { data: activities = [] } = useActivities();

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed overflow-y-auto"
      style={{
        backgroundImage:
          "url('https://images.ecestaticos.com/q_LkdOe0sqZmPRHmfMzMEYCi3aM=/0x0:1254x836/1200x900/filters:fill(white):format(jpg)/f.elconfidencial.com%2Foriginal%2F405%2F46d%2F46a%2F40546d46aeb1cbc50a89643a1bef684b.jpg')",
      }}
    >
      {/* Filter bar */}
      <div className="sticky top-0 z-40 grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 bg-navy/85 backdrop-blur-sm shadow-md">
        <select
          className={selectClass}
          onChange={(e) => { dispatch(setSort(e.target.value)); dispatch(setCurrentPage(1)); }}
        >
          <option value="" hidden>Orden alfabético</option>
          {["A-Z", "Z-A"].map((e, i) => <option key={i} value={e}>{e}</option>)}
        </select>

        <select
          className={selectClass}
          onChange={(e) => { dispatch(setSort(e.target.value)); dispatch(setCurrentPage(1)); }}
        >
          <option value="" hidden>Población</option>
          {["Mayor Población", "Menor Población"].map((e, i) => (
            <option key={i} value={e}>{e}</option>
          ))}
        </select>

        <select
          className={selectClass}
          onChange={(e) => dispatch(setContinentFilter(e.target.value))}
        >
          <option value="" hidden>Continente</option>
          {["Asia", "Europe", "Africa", "Oceania", "Americas", "Polar", "Antarctic Ocean", "Antarctic"].map(
            (e, i) => <option key={i} value={e}>{e}</option>
          )}
        </select>

        {activities.length > 0 && (
          <select
            className={selectClass}
            onChange={(e) => dispatch(setActivityFilter(e.target.value))}
          >
            <option value="" hidden>Actividad</option>
            {activities.map((e) => (
              <option key={e.id} value={e.name}>{e.name}</option>
            ))}
          </select>
        )}

        <button
          onClick={() => dispatch(clearFilters())}
          className="col-span-2 sm:col-span-1 px-4 py-1.5 rounded-lg bg-white/10 text-white/70 text-sm hover:bg-red-500/70 hover:text-white transition-colors duration-200"
        >
          ✕ Borrar filtros
        </button>
      </div>

      <CardsContainer />
    </div>
  );
};

export default Home;
