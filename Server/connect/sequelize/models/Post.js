const sequelize = require('sequelize')
const connect = require('../config/config.js')

const Post = connect.define('Post', {
    userId: {
        type : sequelize.INTEGER
    },
    title: {
        type : sequelize.TEXT
    },
    content: {
        type : sequelize.TEXT
    }
}, {tableName: "posts"})


module.exports = Post