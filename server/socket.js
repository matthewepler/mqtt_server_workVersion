function initSocket (server) {
  var io = require('socket.io')(server)

  io.on('connection', function (socket) {
    console.log('server has io connection, yo!')

    socket.emit('test', {hello: 'world'})

    socket.on('test', function (data) {
      console.log(data)
    })

    socket.on('disconnect', function () {
      console.log('connection from client is now disconnected')
    })
  })
}

module.exports = {
  initSocket: initSocket
}
