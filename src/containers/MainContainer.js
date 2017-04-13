import React, { Component } from 'react'
import Client from 'ibmiotf'

// UI components
import Main from '../components/Main'

// styles
import '../styles/index.css'

class MainContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {}

    this.appClientConfig = {
      'org': 'ykq7wp',
      'id': 'server-status-dashboard',
      'domain': 'internetofthings.ibmcloud.com',
      'auth-key': 'a-ykq7wp-cnuhjhye5z',
      'auth-token': '&K_yj9KS!@zt4@rkIM',
      'type': 'shared'
    }

    this.client = new Client.IotfApplication(this.appClientConfig)
  }

  componentDidMount () {
    this.client.connect()

    this.client.on('connect', () => {
      console.log('connected to broker')
      this.client.subscribeToDeviceEvents('hcs_tag')
    })

    this.client.on('deviceEvent', (deviceType, deviceId, eventType, format, payload) => {
      console.log(`${deviceId}: ${payload}`)

      // check if deviceId is already known
      // if yes, update its timestamp
      // if no, add it to the list and add a timestamp
    })
  }

  render () {
    return (
      <div className='main-container'>
        <Main />
      </div>
    )
  }
}

export default MainContainer
