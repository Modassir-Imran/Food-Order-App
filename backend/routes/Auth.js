const express = require('express')
const { body, validationResult } = require('express-validator')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config();

const Order = require('../models/Orders');

const jwtSecrete = process.env.JWT_SECRETE
router.post(
  '/createuser',
  [
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('name')
      .isLength({ min: 5 })
      .withMessage('Name must be at least 5 characters long'),
    body('password')
      .isLength({ min: 5 })
      .withMessage('Password must be at least 5 characters long')
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    const salt = await bcrypt.genSalt(10)
    const secPassword = await bcrypt.hash(req.body.password, salt)

    try {
      const newUser = await User.create({
        name: req.body.name,
        password: secPassword,
        email: req.body.email,
        location: req.body.location
      })

      return res.status(201).json({ success: true, user: newUser })
    } catch (error) {
      console.error('Error creating user:', error.message || error)
      return res.status(500).json({ success: false, error: 'Server Error' })
    }
  }
)

router.post(
  '/loginuser',
  [body('email').isEmail().withMessage('Please enter a valid email address')],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    let email = req.body.email

    try {
      let userData = await User.findOne({ email })

      if (!userData) {
        return res.status(400).json({ errors: 'Enter correct email Id' })
      }
      const pwdCompare = await bcrypt.compare(
        req.body.password,
        userData.password
      )

      if (!pwdCompare) {
        return res.status(400).json({ errors: 'Password is not correct' })
      }

      const data = {
        user: {
          id: userData.id
        }
      }
      const authToken = jwt.sign(data, jwtSecrete)
      return res.json({
        success: true,
        authToken: authToken
      })
    } catch (error) {
      console.error('Error creating user:', error.message || error)
      return res.status(500).json({ success: false, error: 'Server Error' })
    }
  }
)

router.post('/myOrderData', async (req, res) => {
  
    try {
  
      //console.log(req.body.email)
      let myData = await Order.findOne({ email: req.body.email })
      res.json({ orderData: myData })
      //console.log("order datin backend me aaya ai ", myData)
  
    } catch (error) {
      res.send('Error', error.message)
    }
  })

router.post('/foodData', (req, res) => {
    try {
      console.log(global.fetched_data)
      res.send([global.fetched_data, global.foodCategory])
    } catch (error) {
      console.error(error.messege)
      res.send('Server error')
    }
  })



  router.post('/orderData', async (req, res) => {
    let data = req.body.order_data || []
  // console.log("order datin backend me aaya ai ", data)
    await data.splice(0, 0, { Order_date: req.body.order_date })
  
    //if email not exisitng in db then create: else: InsertMany()
    let eId = await Order.findOne({ email: req.body.email })
  
    if (eId === null) {
      try {
        await Order.create({
          email: req.body.email,
          order_data: [data]
        }).then(() => {
          res.json({ success: true })
        })
      } catch (error) {
        console.log(error.message)
        res.send('Server Error', error.message)
      }
    } else {
      try {
        await Order.findOneAndUpdate(
          { email: req.body.email },
          { $push: { order_data: data } }
        ).then(() => {
          res.json({ success: true })
          
        })
      } catch (error) {
        console.log(error.message)
        res.send('Server Error', error.message)
      }
    }
  })




module.exports = router
