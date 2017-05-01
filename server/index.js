// server/index.js

var app = require('./app')
var server = require('http').Server(app)
var client = require('./ibmClient')
var socket = require('./socket')

// var io = require('socket.io')(server)
// io.on('connection', function () {
//   console.log('server has io connection!')
// })

var PORT = process.env.PORT || 9000

server.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`)
})

client.initConnection()
socket.initSocket(server)
