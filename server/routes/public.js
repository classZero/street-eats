import express from 'express'
import jwt from 'jsonwebtoken'
import config from 'config'

const router = express.Router() 

router.post('/token', (req, res, next) => {
  // do login checks here
  
  const token = jwt.sign({secret: config.get('jwt-secret')})

  res.json({token})
})

export default router
