const { getCountry, getCountriesByName } = require("../controllers/countriesC");

// const getAllCountriesHandler = async (req, res) => {
//   try {
//     const countries = await getAllCountriesBdd();
//     if (!countries.length)
//       throw new Error("Ocurrió un error en la base de datos");
//     else res.status(200).json(countries);
//   } catch (error) {
//     res.status(400).json(error.message);
//   }
// };

const getCountryHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const country = await getCountry(id);
    if (!country) throw new Error("No se encontró el pais solicitado");
    else res.status(200).json(country);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const getAllCountriesHandler = async (req, res) => {
  const { name } = req.query;
  try {
    const countries = await getCountriesByName(name);
    if (!countries.length)
      throw new Error("El pais que busca no se encuentra o no existe");
    else res.status(200).json(countries);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = { getAllCountriesHandler, getCountryHandler };
