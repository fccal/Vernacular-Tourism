const express = require('express')
const con = require('../modul/db.js')

const router = express.Router()

let db= con.handleDisconnection()

// 处理数据的函数
// data 数据
// root 顶级数据
let getChildren = function (data, root) {
  var children = [];
  for (var i = 0; i < data.length; i++) {
    if (root == data[i].super) {
      data[i].children = getChildren(data, data[i].id);
      children.push(data[i]);
    }
  }
  return children;
}


router.get('/getsection', (req, res) => {
  let sql = `SELECT * FROM section`
  db.query({
    sql: sql
  }, (err, results) => {
    if (err) {
      console.log(err)
    } else {
      res.send(getChildren(results, 0))
    }
  })
})


router.get('/getstaff', (req, res) => {
  let id = req.query.id
  let sql = `SELECT * FROM staff WHERE staff.seid = '${id}'`
  db.query({
    sql: sql
  }, (err, results, fields) => {
    res.send(results)
  })

})



router.get('/getpost', (req, res) => {
  let sql = `SELECT * FROM post`
  db.query({
    sql: sql
  }, (err, results, fields) => {
    res.send(results)
  })

})

//// 添加数据
/*
router.post('/addstaff', (req, res) => {
  let sql = `INSERT INTO staff (name,sex,birthday,other,seid,poid) values ('${req.body.name}','${req.body.sex}','${req.body.birthday}','${req.body.other}',${req.body.seid},${req.body.poid})`
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.json({
        code: 200
      })
    }
  })
})
*/

router.post('/addactivity', (req, res) => {
  let sql = `INSERT INTO activity (id,date,content,num,category,name) values ('${req.body.id}','${req.body.date}','${req.body.content}','${req.body.num}','${req.body.category}','${req.body.name}')`
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.json({
        code: 200
      })
    }
  })
})

router.post('/addinfo', (req, res) => {
  let sql = `INSERT INTO infochange (name,phonenumber,email,birthday,place) values ('${req.body.name}','${req.body.phonenumber}','${req.body.email}','${req.body.birthday}','${req.body.place}')`
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.json({
        code: 200
      })
    }
  })
})

router.post('/addbuyinfo', (req, res) => {
  let sql = `INSERT INTO buy (id,name,phone,address,num) values ('${req.body.id}','${req.body.name}','${req.body.phone}','${req.body.address}','${req.body.num}')`
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.json({
        code: 200
      })
    }
  })
})


router.get('/findstaff', (req, res) => {
  let seid = req.query.seid 
  let poid = req.query.poid 
  let name = req.query.name 
  if (poid) {
    sql = `SELECT * FROM staff WHERE staff.poid = '${poid}' AND staff.seid = ${seid} and staff.name LIKE '%${name}%';`
  } else {
    sql = `SELECT * FROM staff WHERE  staff.seid = ${seid} and staff.name LIKE '%${name}%';`
  }
  db.query({
    sql: sql
  }, (err, results, fields) => {
    console.log(results)
    res.send(results)
  })

})



router.get('/removestaff', (req, res) => {
  let id = req.query.id
  let sql = `DELETE FROM staff WHERE id = '${id}'`
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.json({
        code: 200
      })
    }
  })
})



router.get('/staff_id', (req, res) => {
  let id = req.query.id
  let sql = `SELECT * FROM staff WHERE staff.id = ${id} `
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  })
})


router.post('/update', (req, res) => {
  let id = req.body.id,
    sta = req.body,
   
    newSta = [sta.name, sta.sex, sta.birthday, sta.other, sta.seid, sta.poid]
  let sql = `UPDATE staff SET name = ?, sex = ?, birthday = ?, other = ?, seid = ?, poid = ? WHERE id = ${req.body.id}`
  db.query(sql, newSta, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.json({
        code: 200
      })
    }
  })
})


module.exports = router