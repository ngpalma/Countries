const { Router } = require("express");
const { postActivityHandler, getActivitiesHandler } = require("../handlers/activitiesH");

const activitiesRoutes = Router();

activitiesRoutes.get("/", getActivitiesHandler);
activitiesRoutes.post("/", postActivityHandler);

module.exports = activitiesRoutes;
