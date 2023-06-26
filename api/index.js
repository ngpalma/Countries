const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const { createDbCountries } = require("./src/controllers/countriesC");
const port = process.env.PORT || 3001;

// Syncing all the models at once.
conn.sync({ force: false }).then(async () => {
  // hacemos el llamado a la funcion que trae todo de la api y crea la base de datos
  await createDbCountries();
  server.listen(port, () => {
    console.log(`Server listening at port ${port}`); // eslint-disable-line no-console
  });
});
