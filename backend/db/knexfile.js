module.exports = {
  development: {
    client: "pg",
    connection: {
      host: "localhost",
      user: "postgres",
      password: "Hashem",
      database: "redux",
    },
    migrations: {
      directory: "../migrations",
    },
  },
};
