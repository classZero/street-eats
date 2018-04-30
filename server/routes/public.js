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
    console.log('body:', req.body)

    const username = req.body.username
    const password = sha512(req.body.password)
    const email = req.body.email

    // const profile_image = req.body.uploadURL     //uncomment to add images

    if(req.body.type === "user"){
        const sql = `
            SELECT count(1) AS count FROM users WHERE username = ?
        `
        conn.query(sql, [username], (err, results, fields) => {
            if(results.count > 0) {
                res.status(409).json({
                    message: "Username already taken"
                })
            } else {  //create token here
                const token = jwt.sign({user: username}, config.get('jwt-secret'))
                // INSERT INTO users (username, password, email, fname, lname, profile_image) VALUES (?,?,?,?,?,?)
                const insertSql = `
                    INSERT INTO users (username, password, email) VALUES (?,?,?)
                `

                conn.query(insertSql, [username, password, email], (err2, results2, fields2) => {
                    res.json({
                        message: "User Created",
                        token: token,
                        user: username,
                        email: email
                    })
                    // profile_image: profile_image
                })
            }
        })
    }
    if(req.body.type === "truck"){
        const sql = `
            SELECT count(1) AS count FROM trucks WHERE username = ?
        `
    }

})

router.post('/login', (req, res, next) => {
    const username = req.body.username
    // const password = sha512(req.body.password)
    const password = req.body.username

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

//test username check from both tables
router.get('/testcall', (req,res,next) => {
    // console.log(req)
    const name = "coolguyz"
    const sql = `
            SELECT count(1) as count FROM users WHERE username=? 
            UNION SELECT count(1) as count FROM trucks WHERE username=?
        `

    conn.query(sql, [name,name], (err,results,fields) => {
        // console.log(results.map(res => res.count).indexOf(1))
        if (results.map(res => res.count).indexOf(1) === -1){
                res.json({
                    message: "Username is free"
                })
        }else{
            res.status(401).json({
                message: "Username already taken"
            })
        }

    })
})

export default router
// module.exports = router
