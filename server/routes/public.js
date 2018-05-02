import express from 'express'
import jwt from 'jsonwebtoken'
import config from 'config'
import conn from '../lib/conn'
import sha512 from 'js-sha512'
import {testUsername, testPassword, testEmail} from '../lib/validators'

const router = express.Router() 

router.get('/api', (req, res, next) => {
    console.log('working')
    res.send('working')
})

router.post('/updatelocation/:user/:lat/:lng', (req, res, next) => {
  const username = req.params.user
  const lat = req.params.lat
  const lng = req.params.lng
  console.log(req.params)
  const sql = `
  UPDATE trucks 
  SET lat = ?,lng = ? 
  WHERE username = ?
  `
  conn.query(sql, [lat, lng, username], (err, results, fields) => {
    console.log(JSON.stringify(results))
  })
})

router.post('/updatehours/:user/:opentime/:closetime', (req, res, next) => {
  const username = req.params.user
  const open = req.params.opentime
  const close = req.params.closetime
  console.log(req.params)
  const sql = `
  UPDATE trucks 
  SET timeopen = ?,timeclose = ?
  WHERE username = ?
  `
  conn.query(sql, [open, close, username], (err, results, fields) => {
    console.log(JSON.stringify(results))
  })
})

router.post('/updatespecial/:user/:specialinfo', (req, res, next) => {
  const username = req.params.user
  const special = req.params.specialinfo
  console.log(req.params)
  const sql = `
  UPDATE trucks
  SET specialinfo = ?
  WHERE username = ?
  `
  conn.query(sql, [special, username], (err, results, fields) => {
    console.log(JSON.stringify(results))
  })
})

router.get('/cords/', (req, res, next) => {
  const sql = `
  SELECT * 
  FROM trucks 
  `
  conn.query(sql, (err, results, fields) => {
    // const companyname = results[0].companyname
    // const truckpic = results[0].truckpicurl
    // const lat = results[0].lat
    // const lng = results[0].lng
    // const open = results[0].timeopen
    // const close = results[0].timeclose
    // const specialinfo = results[0].specialinfo
    res.json(
        results
    )
  })
})

router.get('/truckdata', (req, res, next) => {
  const sql = `
    SELECT * FROM trucks
  `
  conn.query(sql, (err, results, fields) => {
    res.json({
      results
    })
  })
})

router.get('/userprofile/:username', (req, res, next) => {
    const username = req.params.username
    const sql = `
    SELECT * 
FROM users 
WHERE username = ?
    `
    conn.query(sql, username, (err, results, fields) => {
        const username = results[0].username
        const email = results[0].email
        res.json({
            username,
            email
        })
    })


})
                   

router.post('/registration', (req, res, next) => {
  console.log('req.body public reg ' + JSON.stringify(req.body))
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
                if(testUsername(username) && testPassword(req.body.password) && testEmail(email)){
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
                } else {
                    res.status(400).json({
                        message: "Bad Request"
                    })
                }
            }

            if (req.body.type === "truck"){

                if(testUsername(username) && testPassword(req.body.password) && testEmail(email)){
                    const token = jwt.sign({user: username}, config.get('jwt-secret'))
                    console.log('public line 94 ' + req.body)
                    const companyname = req.body.companyName
                    const companyLogo = req.body.companyLogo
                    const menuurl = req.body.menu
                    const aboutus = req.body.aboutus

                    const insertSql = `
                        INSERT INTO trucks (username, password, email, companyname, companylogo, menuurl, aboutus) VALUES (?,?,?,?,?,?,?)
                    `

                    conn.query(insertSql, [username, password, email, companyname, companyLogo, menuurl, aboutus], (err2, results2, fields2) =>{
                        res.json({
                            message: "Truck Created",
                            token: token,
                            user: username,
                            email: email,
                            companyLogo: companyLogo,
                            menuurl: menuurl
                        })
                    })
                } else {
                    res.status(400).json({
                        message: "Bad Request"
                    })
                }
            }
        }
    })
})


router.post('/login', (req, res, next) => {
    const username = req.body.username
    const password = sha512(req.body.password)
    // const password = req.body.username

    const sql = `SELECT username, email, companyname, companylogo, menuurl, aboutus, lng, lat, datecreated, 'truck' as Source FROM trucks as truckInfo WHERE username = ? AND password = ?
                UNION
                SELECT username, email, Null as companyname, Null as companylogo, Null as menuurl, Null as aboutus, Null as lng, Null as lat, Null as datecreated, 'user' as Source FROM users as userInfo WHERE username = ? AND password = ?`

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
