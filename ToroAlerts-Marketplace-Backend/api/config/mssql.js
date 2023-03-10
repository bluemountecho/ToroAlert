module.exports = {
    HOST: "localhost",
    PORT: "1450",
    USER: "user1",
    PASSWORD: "toroalert",
    DB: "toroalert",
    dialect: "mssql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };