var app = require('./app')
var server = require('http').Server(app)
var IBMClient = require('ibmiotf')
require('dotenv').config()

var PORT = process.env.PORT || 5000

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

    io.emit('ibm_connected', {})
    // send connected event to front-end
    // (setState brokerConnection = true, set heartbeat, etc.)

    client.subscribeToDeviceEvents('hcs_tag', '+', 'envHi', 'json')
    client.subscribeToDeviceEvents('hcs_tag', '+', 'envLo', 'json')
    client.subscribeToDeviceEvents('hcs_tag', '+', 'event', 'json')
    client.subscribeToDeviceEvents('hcs_tag', '+', 'orient', 'json')
    client.subscribeToDeviceEvents('hcs_tag', '+', 'accel', 'json')
    client.subscribeToDeviceEvents('hcs_tag', '+', 'gyro', 'json')
    client.subscribeToDeviceEvents('hcs_tag', '+', 'magno', 'json')
    client.subscribeToDeviceEvents('hcs_tag', '+', 'meta', 'json')

    // IBM event handlers
    client.on('deviceEvent', (deviceType, deviceId, eventType, format, payload) => {
      // payload is an array of integers and needs coercing
      const data = JSON.parse(String(payload))

      if (eventType === 'event') {
        if (data.data.data === 'ON') {
          // console.log(`event from device#: ${deviceId}`)
        }
      }

      io.emit('deviceEvent', {
        deviceType,
        deviceId,
        eventType,
        format,
        data
      })
    })

    socket.on('disconnect', function () {
      console.log('socket connection from client is now disconnected')
    })
  })
})
