import express from 'express'
import path from 'path'
import favicon from 'serve-favicon'
import logger from 'morgan'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import ejwt from 'express-jwt'
import config from 'config'
import conn from './lib/conn'

import publicRouter from './routes/public'
import privateRouter from './routes/private'
import clientRouter from './routes/client'

const app = express()
const server = require('http').Server(app)
// Set up Express middlewares
// After placing favicon, uncomment favicon import and usage
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

server.listen(3001, () => {
  console.log('listening on port 3001')
})

setInterval(() => {
  const sql = `
    SELECT id, timeopen, timeclose FROM trucks
  `
  conn.query(sql, (err, results, fields) => {   
     
    results.map((truck, i) => {
      
      let rightNow = new Date()
      if(truck.timeopen !== null) {
        var timeopen = new Date(truck.timeopen)
        var timeclose = new Date(truck.timeclose)
        // console.log(timeopen, timeclose, rightNow)
        if (timeopen < rightNow && timeclose > rightNow) {
          const sqlUpdate = `
            UPDATE trucks SET isActive = ? WHERE id = ?
          `
          conn.query(sqlUpdate, [true, results[i].id], (err2, results2, fields2) => {

          })
        } else {
          // console.log('closing')
          const sqlUpdate = `
            UPDATE trucks SET isActive = ? WHERE id = ?
          `
          conn.query(sqlUpdate, [false, results[i].id], (err3, results3, fields3) => {
            
          })
        }
      }  
    })
  })
}, 5000) 

app.use('/api', publicRouter)
app.use('/api', ejwt({secret: config.get('jwt-secret')}), privateRouter)


// Client needs to be the last route handled
// ALL OTHER EXPRESS ROUTES GO ABOVE THIS LINE
app.use('/', clientRouter)

app.use((req, res, next) => {
  let err = new Error('Not Found')
  err.status = 404
  next(err)
})

if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.json({
      error: err
    })
  })
}

if (app.get('env') === 'production') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.json({
      message: 'Oops. Our bad.'
    })
  })
}

export default app
