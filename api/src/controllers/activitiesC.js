const { Country, Activity } = require("../db");

const postActivity = async (name, difficulty, season, duration, countries) => {
  const [newActivity, created] = await Activity.findOrCreate({
    where: {
      name,
      duration,
      difficulty,
      season,
    },
  });
  if (countries && countries.length > 0) {
    const selectedCountries = await Country.findAll({
      where: {
        id: countries,
      },
    });
    await newActivity.setCountries(selectedCountries);
  }
  return newActivity;
};

const getAllActivities = async () => {
  const allActivities = await Activity.findAll({
    include: {
      model: Country,
      attributes: ["name"],
      through: { attributes: [] },
    },
  });
  return allActivities;
};

module.exports = { postActivity, getAllActivities };
