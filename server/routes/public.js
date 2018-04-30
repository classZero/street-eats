import express from 'express'
import jwt from 'jsonwebtoken'
import config from 'config'
import conn from '../lib/conn'
import sha512 from 'js-sha512'

const router = express.Router() 

router.get('/api', (req, res, next) => {
    console.log('working')
    res.send('working')
})

router.post('/registration', (req, res, next) => {
    const username = req.body.username
    const password = sha512(req.body.password)
    const email = req.body.email
    const sql = `
            SELECT count(1) as count FROM users WHERE username=? 
            UNION SELECT count(1) as count FROM trucks WHERE username=?
        `

    conn.query(sql, [username,username], (err, results, fields) => {

        if(results.map(res => res.count).indexOf(1) !== -1){
            console.log('username taken')
            res.status(409).json({
                message: "Username already taken"
            })
        } else {

            if (req.body.type === "user") {
                const token = jwt.sign({user: username}, config.get('jwt-secret'))

                const insertSql = `
                    INSERT INTO users (username, password, email) VALUES (?,?,?)
                `
                conn.query(insertSql, [username, password, email], (err2, results2, fields2) =>{
                    res.json({
                        message: "User Created",
                        token: token,
                        user: username,
                        email: email
                    })
                })
            }

            if (req.body.type === "truck"){
                const token = jwt.sign({user: username}, config.get('jwt-secret'))

                const insertSql = `
                    INSERT INTO trucks (username, password, email) VALUES (?,?,?)
                `

                conn.query(insertSql, [username,password,email], (err2, results2, fields2) =>{
                    res.json({
                        message: "Truck Created",
                        token: token,
                        user: username,
                        email: email
                    })
                })
            }
        }
    })
})


router.post('/login', (req, res, next) => {
    const username = req.body.username
    const password = sha512(req.body.password)
    // const password = req.body.username

    const sql = `
        SELECT * FROM users WHERE username = ? AND password = ?
    `
    conn.query(sql, [username, password], (err, results, fields) => {
        if(results.length > 0) {
            console.log('username and password returned match')
            const token = jwt.sign({user: username}, config.get('jwt-secret'))
            res.json({
                message: "Login Successful",
                token: token,
                user: username, //username also attached to token
            })
        } else {
            res.status(401).json({
                message: "Bad Username and/or Password"
            })
        }
    })
})

export default router
// module.exports = router
