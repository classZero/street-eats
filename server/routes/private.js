import express from 'express'
import config from 'config'

const router = express.Router() 

router.post('/foo', (req, res, next) => {
  res.json({
    foo: 'bar'
  })
})

export default router
