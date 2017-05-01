var Client = require('ibmiotf')
require('dotenv').config()

function initConnection (server) {
  var client = new Client.IotfApplication({
    'org': 'ykq7wp',
    'id': 'mqtt_dashboard_express',
    'domain': 'internetofthings.ibmcloud.com',
    'auth-key': process.env.AUTHKEY,
    'auth-token': process.env.AUTHTOKEN,
    'type': 'shared'
  })

  client.connect()

  client.on('connect', () => {
    console.log('server connected to broker!')

    // send connected event to front-end (setState brokerConnection = true, set heartbeat, etc.)

    client.subscribeToDeviceEvents('hcs_tag', '+', 'envHi', 'json')
    client.subscribeToDeviceEvents('hcs_tag', '+', 'envLo', 'json')
    client.subscribeToDeviceEvents('hcs_tag', '+', 'event', 'json')
    client.subscribeToDeviceEvents('hcs_tag', '+', 'orient', 'json')
  })
}

module.exports = {
  initConnection: initConnection
}
