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

router.post('/addfavorite', (req, res, next) => {
    const username = req.body.username
    const truckuser = req.body.truckuser
    
    const sql = `
    INSERT INTO favorites (username, truckusername) 
    VALUES (?, ?)
    `

    conn.query(sql, [username, truckuser], (err, results, fields) => {
        res.json({
            message : 'Truck added to favorites'
        })
    })

})

router.post('/addmenuitem', (req,res,next) => {
  console.log('in public: ', req.body)
  const getID = `
    SELECT id AS truckid FROM trucks WHERE username = ?
  `
  conn.query(getID, req.body.username, (err, results, fields) => {

    const sql = `
      INSERT INTO menu (itemName, itemPrice, itemDescription, itemType, itemTruckId) VALUES (?,?,?,?,?)
    `

    conn.query(sql, [req.body.itemName, req.body.itemPrice, req.body.itemDescription, req.body.itemType, results[0].truckid], (err2, results2, fields2) => {
      console.log(results)
      res.json({
        message: 'item added'
      })
    })

  })
})

export default router
