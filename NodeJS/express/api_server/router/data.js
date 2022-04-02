const express = require('express')
const router = express.Router()

const data_handler = require('../router_handle/data')


router.post('/getDate', data_handler.getList)
router.post('/getDetailList', data_handler.getDetailList)
router.get('/getPeopleRoad', data_handler.peopleRoadList)

module.exports = router