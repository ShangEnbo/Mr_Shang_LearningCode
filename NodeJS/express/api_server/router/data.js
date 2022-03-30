const express = require('express')
const router = express.Router()

const data_handler = require('../router_handle/data')


router.post('/getDate', data_handler.getList)


module.exports = router