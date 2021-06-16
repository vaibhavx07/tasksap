var express = require('express');
var router = express.Router();
var taskCtrl = require('../controllers/taskCtrl');

router.post('/createtask/:id?', taskCtrl.createtask);

router.get('/tasklist/:id?', taskCtrl.takslist);

router.delete('/deletetask/:id', taskCtrl.deletetask);


//router.get('/markdone/:id', taskCtrl.markdone);
/* GET home page. */


module.exports = router;
