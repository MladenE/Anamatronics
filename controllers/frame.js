var express = require('express')
  , router = express.Router()

// Create
router.post('/create/', auth, function(req, res) {
    //newName = req.user.newName
})

// Read
router.get('/', function(req, res) {
    res.send('All Frames');
})

// Update
router.get('/edit/:id', function(req, res) {
    res.send('Get Frame ' + req.params.id + ' for editing');
})

router.post('/edit/', auth, function(req, res) {

})

// Delete
router.delete('/delete/:id', function(req, res) {

})

module.exports = router