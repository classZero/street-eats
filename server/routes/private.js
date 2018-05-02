import express from 'express'
import config from 'config'
import conn from '../lib/conn'

const router = express.Router() 


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

router.post('/editTruckProfile', (req, res, next) => {
  console.log(req.body)
  const name = req.body.companyname
  const logo = req.body.logo
  const aboutus = req.body.aboutus
  const menuurl = req.body.menuurl
  const username = "lt"
  
  const sql = `
  UPDATE trucks 
  SET 
  companyname = ?,
  companylogo = ?,
  aboutus = ?,
  menuurl = ? 
  WHERE username = ?
  `

  conn.query(sql, [name, logo, aboutus, menuurl, username], (err, results, fields) => {
      res.json({
          name,
          logo,
          aboutus,
          menuurl
      })
  } )



})

export default router
