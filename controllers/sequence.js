var express = require('express')
  , router = express.Router()
  //, Comment = require('../models/comment')
  //, auth = require('../middlewares/auth')


// Create
router.post('/create/', auth, function(req, res) {
    newName = req.user.newName
})

// Read
router.get('/', function(req, res) {
    res.send('All Sequences');
})

router.get('/:id', function(req, res) {
    res.send('Sequence ' + req.params.id);
})

// Edit
router.get('/edit/:id', function(req, res) {
    res.send('Get Sequence ' + req.params.id + ' for editing');
})

router.post('/edit/', auth, function(req, res) {

})

// Delete
router.delete('/delete/:id', function(req, res) {

})

// Play
router.get('/play/:id', function(req, res) {
    res.send('Play Sequence ' + req.params.id);
})

/*
router.post('/', auth, function(req, res) {
  user = req.user.id
  text = req.body.text

  Comment.create(user, text, function (err, comment) {
    res.redirect('/')
  })
})

router.get('/:id', function(req, res) {
  Comment.get(req.params.id, function (err, comment) {
    res.render('comments/comment', {comment: comment})
  })
})
*/

module.exports = router