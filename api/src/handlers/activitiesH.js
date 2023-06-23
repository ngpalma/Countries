const {
  postActivity,
  getAllActivities,
} = require("../controllers/activitiesC");

const postActivityHandler = async (req, res) => {
  const { name, difficulty, season, duration, countries } = req.body;
  try {
    if (![name, difficulty, season, duration].every(Boolean))
      throw new Error("Faltan datos importantes");
    const newActivity = await postActivity(
      name,
      difficulty,
      season,
      duration,
      countries
    );
    res.status(200).json(newActivity);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const getActivitiesHandler = async (req, res) => {
  try {
    const allActivities = await getAllActivities();
    res.status(200).json(allActivities);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = { postActivityHandler, getActivitiesHandler };
