var app = require('./app')
var server = require('http').Server(app)
var connectToIBM = require('./ibmClient')
require('dotenv').config()

var PORT = process.env.PORT || 5000

server.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`)
})

// SOCKET STUFF
var io = require('socket.io')(server)

io.on('connection', function (socket) {
  console.log('server has io connection, yo!')
})

if (process.env.NODE_ENV === 'production') {
  connectToIBM(io)
}
