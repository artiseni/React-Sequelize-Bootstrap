const Sequelize = require('sequelize')


const connect = new Sequelize('appdata', 'linux', 'password', {
  host: 'localhost',
  dialect: 'postgres',

  pool: {
    max: 5,
    min: 0,
    scuire: 30000,
    idle: 10000
  }
})

module.exports = connect
