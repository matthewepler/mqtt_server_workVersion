var app = require('./app')
var server = require('http').Server(app)
var IBMClient = require('ibmiotf')
require('dotenv').config()

var PORT = process.env.PORT || 9000

server.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`)
})

// SOCKET STUFF
var io = require('socket.io')(server)

io.on('connection', function (socket) {
  console.log('server has io connection, yo!')

  // IBM STUFF
  var client = new IBMClient.IotfApplication({
      'org': 'ykq7wp',
      'id': 'mqtt_dashboard_express_2384',
      'domain': 'internetofthings.ibmcloud.com',
      'auth-key': process.env.AUTHKEY,
      'auth-token': process.env.AUTHTOKEN,
      'type': 'shared'
    })

    client.connect()

    client.on('connect', () => {
      console.log('server connected to broker!')

      socket.emit('ibm_connected', {})
      // send connected event to front-end 
      // (setState brokerConnection = true, set heartbeat, etc.)

      client.subscribeToDeviceEvents('hcs_tag', '+', 'envHi', 'json')
      client.subscribeToDeviceEvents('hcs_tag', '+', 'envLo', 'json')
      client.subscribeToDeviceEvents('hcs_tag', '+', 'event', 'json')
      client.subscribeToDeviceEvents('hcs_tag', '+', 'orient', 'json')

      // IBM event handlers
      client.on('deviceEvent', (deviceType, deviceId, eventType, format, payload) => {
        // payload is an array of integers and needs coercing
        const data = JSON.parse(String(payload))

        socket.emit('deviceEvent', {
          deviceType,
          deviceId,
          eventType,
          format,
          data,
        });
      })

      socket.on('test', function (data) {
        console.log(data)
      })

      socket.on('disconnect', function () {
        console.log('socket connection from client is now disconnected')
      })
    })

  

  // other socket func. examples:

  // socket.emit('test', {hello: 'world'})

})
