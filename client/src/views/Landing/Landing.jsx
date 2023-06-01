import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Aplicación de paises</h1>
      <h2>Por Nicolás Palma</h2>
      <button
        onClick={() => {
          navigate("/home");
        }}
      >
        Ingresar
      </button>
    </div>
  );
};

export default Landing;
