var express = require('express')
  , router = express.Router()


// Read Positions
router.get('/', function(req, res) {
    res.send('All Frames');
})

router.get('/:id', function(req, res) {
    res.send('Frame ' + req.params.id);
})

// Update
router.post('/edit/', auth, function(req, res) {

})


module.exports = router