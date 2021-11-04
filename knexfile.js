const path = require('path');
require('dotenv').config();

const {
  DEVELOPMENT_DATABASE_URL,
  PRODUCTION_DATABASE_URL,
  NODE_ENV = 'development',
} = process.env;

const DATABASE_URL = NODE_ENV === 'production' ? PRODUCTION_DATABASE_URL : DEVELOPMENT_DATABASE_URL;

module.exports = {

  development: {
    client: 'postgresql',
    connection: DATABASE_URL,
    migrations: {
      directory: path.join(__dirname, 'src', 'db', 'migrations') 
    },
    seeds: {
      directory: path.join(__dirname, 'src', 'db', 'seeds')
    },
  },

  production: {
    client: 'postgresql',
    connection: DATABASE_URL,
    migrations: {
      directory: path.join(__dirname, 'src', 'db', 'migrations') 
    },
    seeds: {
      directory: path.join(__dirname, 'src', 'db', 'seeds')
    },
  },

};
