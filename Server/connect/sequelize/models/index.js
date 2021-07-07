const Sequelize = require('sequelize')
const config = require("../config/config")
const Post = require("./Post")
const User = require("./User")

const models = {}
models.Sequelize = Sequelize
models.sequelize = config
models.Post = Post
models.User = User

module.exports = models