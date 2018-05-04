import express from 'express'
import config from 'config'
import conn from '../lib/conn'

const router = express.Router() 

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
