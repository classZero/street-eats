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
    console.log('update location results', JSON.stringify(results))
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
    // console.log('update hours results',JSON.stringify(results))
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
    // console.log(JSON.stringify(results))
  })
})

//gets truck data for home page by sort param
router.get('/truckdata/:sort', (req, res, next) => {
  let type = req.params.sort
  let sql = ''
  if (type === 'all') {
    sql = `
      SELECT * FROM trucks
    `
  } else if (type === 'new') {
    sql = `
      SELECT * FROM trucks ORDER BY datecreated ASC
    `
  } else if (type === 'alpha') {
    sql = `
      SELECT * FROM trucks ORDER BY companyname ASC
    `
  } else if (type === 'active') {
    sql = `
      SELECT * FROM trucks WHERE isActive = 1 
    `
  } else {
    sql = `
    SELECT * FROM trucks
    `
  }  
  conn.query(sql, (err, results, fields) => {
    console.log('truckdata sort results' , JSON.stringify(results))
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
            console.log('username taken')
            res.status(409).json({
                message: "Username already taken"
            })
        } else {

            if (req.body.type === "user") {
              const avatar = req.body.avatar
                if(testUsername(username) && testPassword(req.body.password) && testEmail(email)){
                    const token = jwt.sign({user: username, source: req.body.type, avatar: results[0].avatar}, config.get('jwt-secret'))

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
                    const token = jwt.sign({user: username, source: req.body.type, avatar: results[0].avatar}, config.get('jwt-secret'))
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

    const sql = `SELECT id, username, email, NULL as avatar, companyname, companylogo, menuurl, aboutus, lng, lat, datecreated, 'truck' as Source FROM trucks as truckInfo WHERE username = ? AND password = ?
                UNION
                SELECT id, username, email, avatar, Null as companyname, Null as companylogo, Null as menuurl, Null as aboutus, Null as lng, Null as lat, Null as datecreated, 'user' as Source FROM users as userInfo WHERE username = ? AND password = ?`

    conn.query(sql, [username, password, username, password], (err, results, fields) => {
      console.log('login results ' + JSON.stringify(results))
        if(results.length > 0) {
            console.log('username and password returned match')
            console.log(results[0].id)
            const token = jwt.sign({user: username, source: results[0].Source, avatar: results[0].avatar, logo: results[0].companylogo}, config.get('jwt-secret'))
            res.json({
                message: "Login Successful",
                token: token,
                user: username, //username also attached to token
                source: results[0].Source,
                avatar: results[0].avatar,
                logo: results[0].companylogo
            })
        } else {
            res.status(401).json({
                message: "Bad Username and/or Password"
            })
        }
    })
})


router.get('/truckprofile/:username', (req, res, next) => {
    // console.log(req.params.username)
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
      const sql = `
      SELECT review 
      FROM reviews 
      WHERE truckusername = ?
      `

      conn.query(sql, username, (err,results, fields) => {
          const reviews = results

          res.json({
            reviews
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
      SELECT t.username, t.companyname, t.companylogo 
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

  
const stripe = require('stripe')('sk_test_zGrjspkLXtCEX59BW1kQjVE6')

// const stripe = configureStripe('sk_test_zGrjspkLXtCEX59BW1kQjVE6');

const postStripeCharge = res => (stripeErr, stripeRes) => {
  if (stripeErr) {
    res.status(500).send({ error: stripeErr });
  } else {
    res.status(200).send({ success: stripeRes });
  }
}

router.post('/payments', (req, res, next) => {
  console.log('public',JSON.stringify(req.body))
  // stripe.charges.create({amount: req.body.amount,
  //                        currency: req.body.CURRENCY,
  //                        source: req.body.token,
  //                        description: req.body.description}, postStripeCharge(res));
  const charge = stripe.charges.create({
    amount: req.body.amount,
    currency: req.body.currency,
    description: req.body.description,
    source: req.body.token,
  }, postStripeCharge(res));
  res.json({
    data: charge
  })
})


router.get('/getmenu/:truckuser', (req,res,next) => {
  const getID = `
    SELECT id AS truckid FROM trucks WHERE username = ?
  `

  conn.query(getID, req.params.truckuser, (err, results, next) => {
    console.log('getmenu: ', results)

    const sql = `
      SELECT * FROM menu WHERE itemTruckId = ?
    `
    conn.query(sql, results[0].truckid, (err2, results2, fields2) => {
      console.log(results)
      res.json({
        menu: results2
      })
    })
  })


})


export default router
