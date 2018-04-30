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


router.get('/truckprofile/:username', (req, res, next) => {
  const username = req.params.username
  const sql = `
  SELECT * 
  FROM trucks 
  WHERE username = ?
  `
  conn.query(sql, username, (err, results, fields) => {
    const companyname = results[0].companyname
    const aboutus = results[0].aboutus
    const menuurl = results[0].menuurl
    const truckpic = results[0].truckpicurl
    
    res.json({
        companyname,
        aboutus,
        menuurl,
        truckpic
    })
  })

})

router.get('/userprofile/:username', (req, res, next) => {
    const username = req.params.username
    console.log('user ' + username)
    const sql = `
    SELECT * 
  FROM users 
  WHERE username = ?
    `
    conn.query(sql, username, (err, results, fields) => {
        const username = results[0].username
        res.json({
            username
        })
    })


})

router.post('/registration', (req, res, next) => {
    const username = req.body.username
    const password = sha512(req.body.password)
    const email = req.body.email
    // const profile_image = req.body.uploadURL     //uncomment to add images

    const sql = `
        SELECT count(1) FROM users WHERE username = ?
    `
    conn.query(sql, [username], (err, results, fields) => {
        if(results.count > 0) {
            res.status(409).json({
                message: "Username already taken"
            })
        } else {  //create token here
            const token = jwt.sign({user: username}, config.get('jwt-secret'))
            const insertSql = `
                INSERT INTO users (username, password, email, fname, lname, profile_image) VALUES (?,?,?,?,?,?)
            `
            conn.query(insertSql, [username, password, email, fname, lname, profile_image], (err2, results2, fields2) => {
                res.json({
                    message: "User Created",
                    token: token,
                    user: username,
                    email: email,
                    profile_image: profile_image
                })
            })
        }
    })
})

router.post('/login', (req, res, next) => {
    const username = req.body.username
    // const password = sha512(req.body.password)
    const password = req.body.username

    const sql = `SELECT username, companyname, menuurl, aboutus, lon, lat, tempaddress, datecreated,'truck' as Source FROM trucks as truckInfo WHERE username = ? AND password = ? 
    UNION ALL
   SELECT username, Null as companyname, Null as menuurl, Null as aboutus, Null as lon, Null as lat, Null as tempaddress, Null as datecreated, 'user' as Source FROM users as userInfo WHERE username = ? AND password = ?
   
   `
    conn.query(sql, [username, password, username, password], (err, results, fields) => {
      console.log('login results ' + JSON.stringify(results))
        if(results.length > 0) {
            console.log('username and password returned match')
            const token = jwt.sign({user: username}, config.get('jwt-secret'))
            res.json({
                message: "Login Successful",
                token: token,
                user: username, //username also attached to token
                source: results[0].Source
            })

        } else {
            res.status(401).json({
                message: "Bad Username and/or Password"
            })
        }
    })
})

export default router
