const sequelize = require('sequelize')
const connect = require('../config/config.js')
const Post = require("./Post")

const User = connect.define('User', {
    username: {
        type : sequelize.STRING
    },
    email: {
        type : sequelize.STRING
    },
    password: {
        type : sequelize.STRING
    }
},{tableName: "users"})


Post.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user'
})
User.hasMany(Post,
    {
        foreignKey: 'userId',
        as : 'posts'
})


module.exports = User