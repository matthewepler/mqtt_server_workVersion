var Client = require('ibmiotf')
require('dotenv').config()

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
})

module.exports = client
