// server/index.js

var app = require('./app')
var server = require('http').Server(app)
// var IBMClient = require('./ibmClient')
var socket = require('./socket')

var PORT = process.env.PORT || 9000

server.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`)
})

// IBMClient.initConnection()
socket.initSocket(server)
