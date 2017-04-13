import React, { Component } from 'react'
import Client from 'ibmiotf'

// helpers
import { getCurrTimeString } from './helpers/utils'

// styles
import '../styles/index.css'

class MainContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      activeTags: [],
      brokerConnection: false,
      debug: false
    }

    this.appClientConfig = {
      'org': 'ykq7wp',
      'id': 'server-status-dashboard',
      'domain': 'internetofthings.ibmcloud.com',
      'auth-key': 'a-ykq7wp-cnuhjhye5z',
      'auth-token': '&K_yj9KS!@zt4@rkIM',
      'type': 'shared'
    }

    this.client = new Client.IotfApplication(this.appClientConfig)

    this.heartbeatTimer = 2000
    // ^ (milliseconds) determines when a connection is considered dead
  }

  componentDidMount () {
    this.client.connect()

    this.client.on('connect', () => {
      console.log('connected to broker')
      // environ data is sent every 1 sec, and is used as a 'heartbeat' monitor
      this.client.subscribeToDeviceEvents('hcs_tag', '+', 'envLo')
      this.setState({ brokerConnection: true })
    })

    this.client.on('disconnect', () => {
      console.log('disconnected from broker')
      this.setState({ brokerConnection: false })
    })

    this.client.on('deviceEvent', (deviceType, deviceId, eventType, format, payload) => {
      if (this.state.debug) console.log(`${deviceId}: ${payload}`)

      // check if deviceId is already known
      const alreadyExists = this.state.activeTags.findIndex((obj) => {
        return obj.id === deviceId
      })

      // if yes, update its timestamp
      if (alreadyExists >= 0) {
        const activeTags = this.state.activeTags
        activeTags[alreadyExists].timestamp = getCurrTimeString()
        this.setState({ activeTags })
      } else {
        // if no, add it to the list and add a timestamp
        const activeTags = this.state.activeTags
        activeTags.push({
          id: deviceId,
          timestamp: getCurrTimeString()
        })
        this.setState({ activeTags })
      }
    })
  }

  render () {
    const allTags = this.state.activeTags.map((tag, index) => {
      return (
        <tr key={index}>
          <td>{tag.id}</td>
          <td>{tag.timestamp}</td>
        </tr>
      )
    })

    return (
      <div className='main-container'>
        <table className='device-list'>
          <thead>
            <tr className={this.state.brokerConnection ? 'connected' : 'disconnected'}>
              <th>ID</th>
              <th>TIMESTAMP</th>
            </tr>
          </thead>
          <tbody>
            {allTags}
          </tbody>
        </table>
      </div>
    )
  }
}

export default MainContainer
