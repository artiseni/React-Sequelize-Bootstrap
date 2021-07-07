const express = require('express')
const router = express.Router()
const models = require('../models')



router
    .route('/blogs')
    .get(async (req, res) => {
        const data = await models.Post.findAll({ include: 'user' })
        res.json(data)
    })
    .post(async (req, res) => {
        const data = await models.Post.findAll({
            offset: 0,
            limit : 4,
            include: 'user'
        })
        res.json(data)
    })

router
    .route('/user')
    .post((req, res) => {

    User.findAll()
        .then(users => {
            let arrObj = []
            for (let i = 0; i < users.length; i++) {
                arrObj.push(users[i].dataValues)
            }
            res.status(200)
            res.json(arrObj)
    }).catch( err => console.log(err))
})

router
    .route('/post')
    .post((req, res) => {
 
    Post.findAll()
        .then(posts => {
            let arrObj = []
            for (let i = 0; i < posts.length; i++) {
                arrObj.push(posts[i].dataValues)
            }
            res.status(200)
            res.json(arrObj)
    }).catch( err => console.log(err))
})



module.exports = router


// const data = await Posts.findAll({
//             where: {
//                 post_by : 'Ani'
//             }
//         })
//         let arrObj = []
//         for (let i = 0; i < data.length; i++) {
//             arrObj.push(data[i].dataValues)
//         }
//         console.log(arrObj)