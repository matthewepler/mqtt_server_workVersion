var IBMClient = require('ibmiotf')

var connectToIBM = function (io) {
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

    io.emit('socket_connected', {})
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
      var data = JSON.parse(String(payload))

      io.emit('deviceEvent', {
        deviceType,
        deviceId,
        eventType,
        format,
        data
      })
    })
  })
}

module.exports = connectToIBM
