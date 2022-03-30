const db = require('../db/index')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const config = require('../config')


exports.getList =  (req, res) => {
  const data = req.body
  console.log(data);
  const sql = `select location.*, count(scan_info.locationid) as 'number'
  from scan_info join location 
  on location.locationid = scan_info.locationid
  where location.school_location= ?
  and scantime between ? and ? 
  Group by locationid`
  db.query(sql, [data.school, data.startTime, data.endTime], (err, results) => {
    if(err) return res.cc(err)
    if(results.length === 0) return res.cc('无数据', 200)
    res.send({
      status: 200,
      message: '查询成功',
      data: results
    })
  })
}