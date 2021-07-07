const sequelize = require('sequelize')
const connect = require('../config/config.js')

const Post = connect.define('Post', {
    userId: {
        type : sequelize.INTEGER
    },
    title: {
        type : sequelize.STRING
    },
    content: {
        type : sequelize.STRING
    }
}, {tableName: "posts"})


module.exports = Post