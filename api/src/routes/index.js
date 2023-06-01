const { Router } = require("express");
const countriesRoutes = require("./countriesR");
const activitiesRoutes = require("./activitiesR");

const router = Router();

router.use("/countries", countriesRoutes);
router.use("/activities", activitiesRoutes);

module.exports = router;
