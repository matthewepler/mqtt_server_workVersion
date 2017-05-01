function initSocket (server) {
  var io = require('socket.io')(server)
  io.on('connection', function () {
    console.log('server has io connection, yo!')
  })
}

module.exports = {
  initSocket: initSocket
}
