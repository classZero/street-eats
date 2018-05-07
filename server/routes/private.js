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
  const getID = `
    SELECT id AS truckid FROM trucks WHERE username = ?
  `
  conn.query(getID, req.body.username, (err, results, fields) => {

    const sql = `
      INSERT INTO menu (itemName, itemPrice, itemDescription, itemType, itemTruckId) VALUES (?,?,?,?,?)
    `

    conn.query(sql, [req.body.itemName, req.body.itemPrice, req.body.itemDescription, req.body.itemType, results[0].truckid], (err2, results2, fields2) => {
      console.log('private:', results2)
      res.json({
        message: 'item added'
      })
    })

  })
})

router.post('/removeitem', (req,res,next) => {
  console.log('body: ',req.body.itemID)
  const sql = `
    DELETE FROM menu WHERE id = ?
  `
  conn.query(sql, req.body.itemID, (err, results, fields) => {
    res.json({
      message: 'item deleted'
    })
  })
})

router.post('/addreview', (req, res, next) => {
    const username = req.body.username
    const truckuser = req.body.truckuser
    const reviewtext = req.body.reviewtext

    const sql = `
    INSERT INTO reviews (username, truckusername, review) 
    VALUES (?, ?, ?)
    `
    conn.query(sql, [username, truckuser, reviewtext], (err, results, fields) => {
        console.log(results)
        res.json({
            message: 'Thanks for your Feedback!'
        })
    })
})

export default router
