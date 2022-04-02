const db = require("../db/index");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const config = require("../config");

exports.getList = (req, res) => {
  const data = req.body;
  console.log(data);
  const sql = `select location.*, count(scan_info.locationid) as 'number'
  from scan_info join location 
  on location.locationid = scan_info.locationid
  where location.school_location= ?
  and scantime between ? and ? 
  Group by locationid`;
  db.query(sql, [data.school, data.startTime, data.endTime], (err, results) => {
    if (err) return res.cc(err);
    if (results.length === 0) return res.cc("无数据", 200);
    res.send({
      status: 200,
      message: "查询成功",
      data: results,
    });
  });
};

exports.getDetailList = (req, res) => {
  const data = req.body;
  console.log(data)
  let sql = `select scantime, student.*, merge_location
  from scan_info 
  join location 
  on location.locationid = scan_info.locationid
  join student
  on student.stdid = scan_info.stdid
  where location.school_location=?
  and scantime between ? and ?`;
  if(data.detail_location) {
    const str = `and location.detail_location = '${data.detail_location}'`
    sql = `${sql} ${str}`
    db.query(sql, [data.school, data.startTime, data.endTime, data.detail_locaiton], (err, results) => {
      if (err) return res.cc(err);
      if (results.length === 0) return res.cc("无数据", 200);
      res.send({
        status: 200,
        message: "查询成功",
        data: results,
      });
    });
  } else {
    db.query(sql, [data.school, data.startTime, data.endTime], (err, results) => {
      if (err) return res.cc(err);
      if (results.length === 0) return res.cc("无数据", 200);
      const size = parseInt(data.size)
      const page = parseInt(data.page)
      console.log(this.page);
      // console.log(size * page, size * page + size);
      // console.log(results.length/size);
      // console.log(results.slice(size * page, size * page + size).length)
      const arrList = results.slice(size * page, size * page + size)
      const totalPage = results.length % size === 0 ? results.length / size : (results.length / size) + 1
      res.send({
        status: 200,
        message: "查询成功",
        data: {
          total: results.length,
          list: arrList,
          currentPage: page,
          pageSize: size,
          totalPage
        },
      });
    });
  }
  // res.send({
  //   status: 200,
  //   message: "查询成功",
  //   data: sql
  // });
  
};

exports.peopleRoadList = (req, res) => {
  const data = req.query;
  // console.log(data);
  let sql = `select scantime, student.*, merge_location
  from scan_info 
  join location 
  on location.locationid = scan_info.locationid
  join student
  on student.stdid = scan_info.stdid
  where student.stdid = ?`
  db.query(sql, data.stdid, (err, results) => {
    if (err) return res.cc(err);
    if (results.length === 0) return res.cc("无数据", 200);
    res.send({
      status: 200,
      message: "查询成功",
      data: results,
    });
  });
}