var express = require('express')
  , router = express.Router()

  
// Create new Servo
router.post('/create/', auth, function(req, res) {
    //newName = req.user.newName
})

// Read
router.get('/', function(req, res) {
    res.send('Get all Servos');
})

router.get('/:id', function(req, res) {
    res.send('Servo ' + req.params.id);
})

// Update
router.get('/edit/:id', function(req, res) {
    res.send('Get Servo ' + req.params.id + ' for editing');
})

router.post('/edit/', auth, function(req, res) {

})

// Delete
router.delete('/delete/:id', function(req, res) {

})


module.exports = router