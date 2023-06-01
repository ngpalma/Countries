const { Router } = require("express");
const {
  getCountryHandler,
  getAllCountriesHandler,
} = require("../handlers/countriesH");
const countriesRoutes = Router();

countriesRoutes.get("/", getAllCountriesHandler);
countriesRoutes.get("/:id", getCountryHandler);

module.exports = countriesRoutes;
