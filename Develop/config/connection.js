// require('dotenv').config();

// const Sequelize = require('sequelize');

// const sequelize = process.env.DB_URL
//   ? new Sequelize(process.env.DB_URL)
//   : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
//       host: 'localhost',
//       dialect: 'postgres',
//       dialectOptions: {
//         decimalNumbers: true,
//       },
//     });

// module.exports = sequelize;

const Sequelize = require('sequelize');

// Replace these values with your actual database credentials
const DB_NAME = 'ecommerce_db';
const DB_USER = 'postgres';
const DB_PASSWORD = '2010';
const HOST = 'localhost'; // Adjust this if your database host is different

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: HOST,
  dialect: 'postgres',
  dialectOptions: {
    decimalNumbers: true,
  },
});

module.exports = sequelize;
