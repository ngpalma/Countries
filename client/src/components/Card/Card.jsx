import { Link } from "react-router-dom";

const Card = ({ id, flag, name, continent }) => {
  return (
    <Link to={`/detail/${id}`} className="group block">
      <div className="bg-navy/80 rounded-xl overflow-hidden shadow-lg hover:shadow-brand-amber/30 hover:-translate-y-1 transition-all duration-250 w-56">
        <div className="overflow-hidden h-36">
          <img
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            src={flag}
            alt={`Bandera de ${name}`}
            onError={(e) => { e.target.src = "https://flagcdn.com/w320/un.png"; }}
          />
        </div>
        <div className="px-4 py-3">
          <h3 className="text-white font-bold text-sm truncate">{name}</h3>
          <span className="inline-block mt-1 text-xs text-navy font-semibold bg-brand-amber px-2 py-0.5 rounded-full">
            {continent}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default Card;
