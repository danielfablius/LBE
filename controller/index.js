var express = require('express');
var router = express.Router();
var io = require('../socket/socket.js')
data_parkiran = [
{id:1,status:0},
{id:2,status:0},
{id:3,status:0},
{id:4,status:0}
]
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express',data:data_parkiran });
  setTimeout(function(){ 
  	io.sendEvent("update_parkiran",data_parkiran,globalIO);
  	io.sendEvent("stop_loading",{},globalIO); 
  }, 3000);
  
});

router.get('/:id/:status', function(req, res, next) {
  var id = req.params.id;
  var status = req.params.status;
  // res.render('index', { title: 'Express' });
  for (var i = 0; i < data_parkiran.length; i++) {
  	if(data_parkiran[i].id==id)data_parkiran[i].status=status
  };

  io.sendEvent("update_parkiran",data_parkiran,globalIO)
  
  res.json(data_parkiran)

});
module.exports = router;

