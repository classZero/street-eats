import express from 'express'
import config from 'config'
import conn from '../lib/conn'

const router = express.Router() 

router.post('/editTruckProfile', (req, res, next) => {
    const name = req.body.companyname
    const logo = req.body.logo
    const aboutus = req.body.aboutus
    const menuurl = req.body.menuurl
    const username = req.body.username
    
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
            menuurl,
            message : 'Saved your changes'
        })
    })
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

router.post('/removefavorite', (req, res, next) => {
    const user = req.body.username
    const truck = req.body.truckuser
    const id = req.body.id
    const sql = `
        DELETE FROM favorites 
        WHERE truckusername = ? AND username = ? AND id = ?
    `

    conn.query(sql, [truck, user, id], (err, results, fields) => {
        res.json({
            message : "Truck removed from your favorites"
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
            res.json({
                message: 'Item added'
            })
        })
    })
})

router.post('/removeitem', (req,res,next) => {
    const sql = `
        DELETE FROM menu WHERE id = ?
    `
    conn.query(sql, req.body.itemID, (err, results, fields) => {
        res.json({
            message: 'Item deleted'
        })
    })
})

router.post('/addreview', (req, res, next) => {
    const username = req.body.username
    const truckuser = req.body.truckuser
    const reviewtext = req.body.reviewtext
    const rating = req.body.rating

    const sql = `
        INSERT INTO reviews (username, truckusername, review, rating) 
        VALUES (?, ?, ?, ?)
    `
    conn.query(sql, [username, truckuser, reviewtext, rating], (err, results, fields) => {
        res.json({
            message: 'Thanks for your Feedback!'
        })
    })
})

router.post('/deleteReview/:id', (req, res, next) => {
    const id = req.params.id

    const sql = `
        DELETE FROM reviews WHERE id = ?
    `

    conn.query(sql, id, (err, results, fields) => {
        res.json({
            message: "Review Deleted"
        })
    })
})

router.post('/editReview', (req, res, next) => {
    const id = req.body.id
    const text = req.body.text

    const sql = `
        UPDATE reviews 
        SET review = ? WHERE id = ?
    `

    conn.query(sql, [text, id], (err, results, fields) => {
        res.json({
            message: "Review changed"
        })
    })
})

// router.post('/uplocale', (req, res, next) => {
//     const lat = req.body.lat
//     const long = req.body.long
//     const username = req.body.username

//     const sqlGetActiveStatus = `SELECT isActive FROM trucks WHERE username = ? `
//     const sqlUpdateLocOnly = `UPDATE trucks SET lat = ?, lng = ? WHERE username = ? `
//     const sqlUpdateLocAndActive = `UPDATE trucks SET lat = ?, lng = ?, isActive = ? WHERE username = ?`

//     //check if currently active
//     conn.query(sqlGetActiveStatus, username, (err, results, fields) => {
//         //if active, update location only
//         if (results[0].isActive === 1) {
//           console.log('private 156 working')
//             conn.query(sqlUpdateLocOnly, [lat, long, username], (err2, results2, fields2) => {
//                 res.json({
//                     message: 'Location Updated'
//                 })
//             })
//         } else {
//             //update location and activate
//             conn.query(sqlUpdateLocAndActive, [lat, long, 1, username], (err3, results3, fields3) => {
//                 res.json({
//                     message: 'Location updated. You can set a time in your profile'
//                 })
//             })
//         }
//     })                             
// })

// // remove trucks current location and make inactive
// router.post('/removelocale', (req, res, next) => {
//     const username = req.body.username
//     const sqlRemoveLoc = `UPDATE trucks SET lat = DEFAULT, lng = DEFAULT, timeopen = DEFAULT, timeclose = DEFAULT, isActive = DEFAULT WHERE username = ?`
//     conn.query(sqlRemoveLoc, [username], (err, results, fields) => {
//       console.log('query')
//         res.json({
//             message: 'Closing up shop'
//          })
//     })
// })

// //payments with stripe
// const stripe = require('stripe')('sk_test_zGrjspkLXtCEX59BW1kQjVE6')

// router.post('/payments', (req, res, next) => {
//     const charge = stripe.charges.create({
//         amount: req.body.amount,
//         currency: req.body.currency,
//         description: req.body.description,
//         source: req.body.token,
//     })
//     const cart = req.body.cart
//     res.json({
//         data: charge,
//         cart: cart
//     })
// })


export default router
