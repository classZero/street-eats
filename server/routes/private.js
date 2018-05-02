import express from 'express'
import config from 'config'
import conn from '../lib/conn'

const router = express.Router() 

router.post('/foo', (req, res, next) => {
  res.json({
    foo: 'bar'
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

export default router
