var express = require('express')
  , app = express()
  , bodyParser = require('body-parser')
  , validator = require('express-validator');

//app.engine('jade', require('jade').__express)
//app.set('view engine', 'jade')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(validator())                                  // Must come after body-parser
app.use(express.static(__dirname + '/public'))
//app.use(require('./middlewares/users'))
app.use(require('./controllers'))

app.listen(3000, function() {
  console.log('Listening on port 3000...')
})