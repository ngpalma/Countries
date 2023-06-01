const { Country, Activity } = require("../db");

const postActivity = async (name, difficulty, season, countries) => {
  const [newActivity, created] = await Activity.findOrCreate({
    where: {
      name,
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
      attibutes: ["name"],
      through: { attibutes: [] },
    },
  });
  return allActivities;
};

module.exports = { postActivity, getAllActivities };
