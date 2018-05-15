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
  const sql = `
    UPDATE trucks 
    SET lat = ?,lng = ? 
    WHERE username = ?
  `
  conn.query(sql, [lat, lng, username], (err, results, fields) => {
  })
})

//allows truck users to set their active hours
router.post('/updatehours/:user/:opentime/:closetime', (req, res, next) => {
  const username = req.params.user
  const open = req.params.opentime
  const close = req.params.closetime
  const sql = `
    UPDATE trucks 
    SET timeopen = ?,timeclose = ?
    WHERE username = ?
  `
  conn.query(sql, [open, close, username], (err, results, fields) => {
  })
})

router.post('/updatespecial/:user/:specialinfo', (req, res, next) => {
  const username = req.params.user
  const special = req.params.specialinfo
  const sql = `
    UPDATE trucks
    SET specialinfo = ?
    WHERE username = ?
  `
  conn.query(sql, [special, username], (err, results, fields) => {
  })
})

//gets truck data for home page by sort param
router.get('/truckdata/:sort', (req, res, next) => {
  let type = req.params.sort
  let sql = ''
  if (type === 'active') {
    sql = `
      SELECT * FROM trucks WHERE isActive = 1 
    `
  } else if (type === 'new') {
    sql = `
      SELECT * FROM trucks ORDER BY datecreated ASC
    `
  } else if (type === 'alpha') {
    sql = `
      SELECT * FROM trucks ORDER BY companyname ASC
    `
  } else if (type === 'all') {
    sql = `
      SELECT * FROM trucks 
    `
  } else if (type === 'alphaDesc') {
    sql = `
      SELECT * FROM trucks ORDER BY companyname DESC
    `
  } else {
    sql = `
      SELECT * FROM trucks WHERE isActive = 1
    `
  }  
  conn.query(sql, (err, results, fields) => {
    res.json({
      results
    })
  })
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
            // console.log('username taken')
            res.json({
                message: "Username already taken"
            })
        } else {

            if (req.body.type === "user") {
              const avatar = req.body.avatar
                if(testUsername(username) && testPassword(req.body.password) && testEmail(email)){
                    const token = jwt.sign({user: username, source: req.body.type, avatar: results[0].avatar, id: results[0].id}, config.get('jwt-secret'))

                    const insertSql = `
                        INSERT INTO users (username, password, email, avatar) VALUES (?,?,?,?)
                    `
                    conn.query(insertSql, [username, password, email, avatar], (err2, results2, fields2) =>{
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
                    const token = jwt.sign({user: username, source: req.body.type, avatar: results[0].avatar, id: results[0].id}, config.get('jwt-secret'))
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

    const sql = `SELECT id, username, email, NULL as avatar, companyname, companylogo, menuurl, aboutus, lng, lat, datecreated, 'truck' as Source FROM trucks as truckInfo WHERE username = ? AND password = ?
                UNION
                SELECT id, username, email, avatar, Null as companyname, Null as companylogo, Null as menuurl, Null as aboutus, Null as lng, Null as lat, Null as datecreated, 'user' as Source FROM users as userInfo WHERE username = ? AND password = ?`

    conn.query(sql, [username, password, username, password], (err, results, fields) => {
        if(results.length > 0) {
            // console.log('username and password returned match')
            const token = jwt.sign({user: username, source: results[0].Source, avatar: results[0].avatar, logo: results[0].companylogo, id: results[0].id}, config.get('jwt-secret'))
            res.json({
                message: "Login Successful",
                token: token,
                user: username,
                source: results[0].Source,
                avatar: results[0].avatar,
                logo: results[0].companylogo,
                id: results[0].id
            })
        } else {
            res.status(401).json({
                message: "Invalid Username and/or Password"
            })
        }
    })
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
        const logo = results[0].companylogo
        
        res.json({                  
            companyname,
            aboutus,
            menuurl,
            logo
        })
    })
})

router.get('/truckreviews/:username', (req, res, next) => {
    const username = req.params.username
    const sqlRatings = `
      SELECT review, rating
      FROM reviews 
      WHERE truckusername = ?
    `
    const sqlAvg = `
      SELECT AVG(rating) AS average
      FROM reviews
      WHERE truckusername = ?
    `

    conn.query(sqlRatings, username, (err,results, fields) => {
      conn.query(sqlAvg, username, (err2, results2, fields2) => {
        let reviews = results
        let avgReview = results2[0]
            res.json({
              reviews,
              avgReview
            })
        })
    })
})

router.get('/isfavorite/:truck/:user', (req, res, next) => {
  const username = req.params.user
  const truckUsername = req.params.truck

  const sql = `
    SELECT * 
    FROM favorites
    WHERE username = ? 
    AND truckusername = ?
  `
  conn.query(sql, [username, truckUsername], (err, results, fields) => {
    if(results.length) {
      res.json({
        isFavorite: true
      })
    } else {
      res.json({
        isFavorite: false
      })
    }
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
        const avatar = results[0].avatar
        res.json({
            username,
            email,
            avatar
        })
    })
})

router.get('/userfavorites/:username', (req, res, next) => {
    const username = req.params.username
    const sql = `
      SELECT t.username, t.companyname, t.companylogo, f.id
      FROM users u 
      LEFT JOIN favorites f on u.username = f.username 
      LEFT JOIN trucks t on f.truckusername = t.username WHERE u.username = ?
    `

    conn.query(sql, username, (err, results, fields) => {
        const favorites = results
        res.json({
            favorites
        })
    })
})

router.get('/getUsersReviews/:username', (req, res, next) => {
  const username = req.params.username

  const sql = `
    SELECT t.companyname, r.review, r.id
    From trucks t 
    LEFT JOIN reviews r on  t.username = r.truckusername 
    WHERE r.username = ?
  `

  conn.query(sql, username, (err, results, fields) => {
    const reviews = results
    res.json({
      reviews
    })
  })
})

router.get('/getmenu/:truckuser', (req,res,next) => {
  const getID = `
    SELECT id AS truckid FROM trucks WHERE username = ?
  `

  conn.query(getID, req.params.truckuser, (err, results, next) => {
    const sql = `
      SELECT * FROM menu WHERE itemTruckId = ?
    `
    conn.query(sql, results[0].truckid, (err2, results2, fields2) => {
      res.json({
        menu: results2
      })
    })
  })
})


router.post('/uplocale', (req, res, next) => {
  const lat = req.body.lat
  const long = req.body.long
  const username = req.body.username

  const sqlGetActiveStatus = `SELECT isActive FROM trucks WHERE username = ? `
  const sqlUpdateLocOnly = `UPDATE trucks SET lat = ?, lng = ? WHERE username = ? `
  const sqlUpdateLocAndActive = `UPDATE trucks SET lat = ?, lng = ?, isActive = ? WHERE username = ?`

  //check if currently active
  conn.query(sqlGetActiveStatus, username, (err, results, fields) => {
      //if active, update location only
      if (results[0].isActive === 1) {
        console.log('private 156 working')
          conn.query(sqlUpdateLocOnly, [lat, long, username], (err2, results2, fields2) => {
              res.json({
                  message: 'Location Updated'
              })
          })
      } else {
          //update location and activate
          conn.query(sqlUpdateLocAndActive, [lat, long, 1, username], (err3, results3, fields3) => {
              res.json({
                  message: 'Location updated. You can set a time in your profile'
              })
          })
      }
  })                             
})

//remove trucks current location and make inactive
router.post('/removelocale', (req, res, next) => {
  const username = req.body.username
  const sqlRemoveLoc = `UPDATE trucks SET lat = DEFAULT, lng = DEFAULT, timeopen = DEFAULT, timeclose = DEFAULT, isActive = DEFAULT WHERE username = ?`
  conn.query(sqlRemoveLoc, [username], (err, results, fields) => {
    console.log('working')
      res.json({
          message: 'Closing up shop'
       })
  })
})

//payments with stripe
const stripe = require('stripe')('sk_test_zGrjspkLXtCEX59BW1kQjVE6')

router.post('/payments', (req, res, next) => {
    const charge = stripe.charges.create({
        amount: req.body.amount,
        currency: req.body.currency,
        description: req.body.description,
        source: req.body.token,
    })
    const cart = req.body.cart
    res.json({
        data: charge,
        cart: cart
    })
})


export default router
