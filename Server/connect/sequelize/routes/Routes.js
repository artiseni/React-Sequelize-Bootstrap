const express = require('express')
const router = express.Router()
const models = require('../models')


router
    .route('/blogs')
    .post(async (req, res) => {
        const data = await models.Post.findAll({ include: 'user' })
        res.json(data)
    })
    .get(async (req, res) => {
        const page = req.query.page
        const perPage = req.query.perPage
        console.log(`Page ke-${page}`)
        console.log(`Jumlah data = ${perPage}`)
        const data = await models.Post.findAndCountAll({
            offset: (page * perPage) - perPage,
            limit : perPage,
            include: 'user'
        })
        res.json(data)
    })

router
    .route('/mypost')
    .get(async (req, res) => {
        const page = req.query.page
        const perPage = req.query.perPage
        console.log(`Page ke-${page}`)
        console.log(`Jumlah data = ${perPage}`)
        const data = await models.Post.findAndCountAll({
            offset: (page * perPage) - perPage,
            limit : perPage,
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
            res.status(200).json(arrObj)
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
            res.status(200).json(arrObj)
    }).catch( err => console.log(err))
})

router
    .route('/signup')
    .post( async (req, res) => {

        const username = req.body.username
        const email = req.body.email
        const password = req.body.password

        const data = await models.User.findAndCountAll({
            where: {
                email : email
            }
        })

        if (data.count === 0) {
            const addTo = await models.User.create({
                username: username,
                email: email,
                password: password 
            })

            res.status(200).json(addTo)
            
        } else {
            res.status(400).json({message : "Email sudah digunkan"})
        }
})



router
    .route('/login')
    .post( async (req, res) => {

        const email = req.body.email
        const password = req.body.password

        const data = await models.User.findOne({
            where: {
                email: email,
                password: password 
            }
        })

        data ? res.status(200).json(data) : res.status(400).json({message : "Data tidak ditemukan"})

})

module.exports = router
