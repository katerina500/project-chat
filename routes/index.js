var express = require('express');
var router = express.Router();
const redis = require('../database/redis');
let running = false;
 
/* GET home page. */
router.get('/', async function(req, res, next) {
  let now = new Date();
  //for (let i = 0; i < 10000; i++) {
    let count = await redis.get('count', 0);
    count++;
    await redis.set('count', count);
 
    res.send({count});
  });
 
router.get('/stop', async function(req, res, next) {
  running = false;
  res.send({ title: 'Express'});
  });
 
module.exports = router;