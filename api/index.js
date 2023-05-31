const server = require('./src/app.js');
const { conn } = require('./src/db.js');

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  // hacemos el llamado a la funcion que trae todo de la api y crea la base de datos
  server.listen(3001, () => {
    console.log('Server listening at port 3001'); // eslint-disable-line no-console
  });
});
