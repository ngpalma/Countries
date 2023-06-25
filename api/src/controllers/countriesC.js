const axios = require("axios");
const { Country, Activity } = require("../db");

const getAllCountriesApi = async () => {
  const response = await axios.get(
    "https://rest-countries.up.railway.app/v2/all"
  );
  const countries = response.data;
  return countries;
};

const createDbCountries = async () => {
  const countries = await getAllCountriesApi();
  for (const country of countries) {
    await Country.findOrCreate({
      where: { id: country.alpha3Code }, // Utiliza el código alpha3Code como criterio de búsqueda
      defaults: {
        name: country.name,
        flag: country.flags.png,
        continent: country.region,
        capital: country.capital,
        subregion: country.subregion,
        area: country.area,
        population: country.population,
      },
    });
  }
};

const getAllCountriesBdd = async () => {
  const countries = await Country.findAll({
    include: {
      model: Activity,
      attributes: ["name"],
      through: { attributes: [] },
    },
  });
  return countries;
};

const getCountry = async (id) => {
  const country = Country.findByPk(id, {
    include: {
      model: Activity,
      attributes: ["name"],
      through: { attributes: [] },
    },
  });
  return country;
};

const getCountriesByName = async (name) => {
  const allCountries = await getAllCountriesBdd();
  if (!name) return allCountries;
  else
    return allCountries.filter((c) =>
      c.name.toLowerCase().includes(name.toLowerCase())
    );
};

module.exports = {
  getAllCountriesApi,
  createDbCountries,
  getAllCountriesBdd,
  getCountry,
  getCountriesByName,
};
