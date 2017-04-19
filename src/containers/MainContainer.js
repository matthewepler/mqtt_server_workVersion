/*
TO-DO
[ ] remove tag from list when no longer connected
*/

import React, { Component } from 'react'
import Client from 'ibmiotf'

// helpers
import { getCurrTimeString, names } from './helpers/utils'

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
  }

  componentDidMount () {
    this.initConnection()
  }

  initConnection () {
    this.client = new Client.IotfApplication(this.appClientConfig)
    this.client.connect()

    this.client.on('connect', () => {
      console.log('connected to broker')
      this.client.subscribeToDeviceEvents('hcs_tag', '+', 'envHi', 'json')
      this.client.subscribeToDeviceEvents('hcs_tag', '+', 'envLo', 'json')
      this.client.subscribeToDeviceEvents('hcs_tag', '+', 'event', 'json')
      this.client.subscribeToDeviceEvents('hcs_tag', '+', 'orient', 'json')
      this.setState({ brokerConnection: true })
    })

    this.client.on('disconnect', () => {
      console.log('disconnected from broker')
      this.setState({ brokerConnection: false })
      setTimeout(this.initConnection(), 3000)
    })

    this.client.on('deviceEvent', (deviceType, deviceId, eventType, format, payload) => {
      if (this.state.debug) console.log(`${payload}`)

      // payload is an array of integers and needs coercing
      const data = JSON.parse(String(payload))

      // check to see if this tag is already in the list of active tags
      const tagIndex = this.state.activeTags.findIndex((obj) => {
        return obj.id === deviceId
      })

      // if it's not, add it to the list of active tags
      if (tagIndex < 0) {
        this.addTag(deviceId)
      } else {
        // update the tag with the payload data
        this.updateTag(deviceId, eventType, data, tagIndex)
      }
    })
  }

  addTag (id) {
    const activeTags = this.state.activeTags
    activeTags.push({
      id: id,
      name: names[id],
      lastHeard: getCurrTimeString()
    })
    this.setState({ activeTags })
  }

  updateTag (deviceId, eventType, data, tagIndex) {
    // updates are done with direct DOM manipulation for efficiency
    // also, calling this.setState() does not guarantee when the change will
    // take place.

    // data payloads eventType is either 'event' (something bad) or r
    // regular updates that bear the name of the data type, i.e. 'orient'

    // update the 'last heard' timestamp so we know if it's active
    document.getElementById(`${deviceId}-last-heard`).innerHTML = getCurrTimeString()

    if (eventType === 'event') {
      // only bad_bend exists right now. put logic here in future for other types
      document.getElementById(`${deviceId}-bad-bend`).innerHTML = data.data.data
    } else if (eventType === 'orient') {
      // we expecte <= 30 objects but only need to use 1 for an update
      for (let key in data.data[0]) {
        if (key !== 'timestamp') {
          document.getElementById(`${deviceId}-${key}`).innerHTML = data.data[0][key]
        }
      }
    } else {
      for (let key in data.data) {
        document.getElementById(`${deviceId}-${key}`).innerHTML = data.data[key]
      }
    }

    // const activeTags = this.state.activeTags
    // activeTags[tagIndex] = udpatedTag
    // this.setState({ activeTags })
  }

  render () {
    const allTags = this.state.activeTags.map((tag, index) => {
      return (
        <tr
          id={tag.id}
          className={this.state.brokerConnection ? 'status-good' : 'status-error'}
          key={index}
        >
          <td id={`${tag.id}-id`} className='tag-id'>{tag.id}</td>
          <td id={`${tag.id}-name`} className='tag-nae'>{tag.name}</td>
          <td id={`${tag.id}-last-heard`} className='tag-last-heard'>{tag.lastHeard}</td>
          <td id={`${tag.id}-bad-bend`} className='tag-bad-bend' />

          <td id={`${tag.id}-mic`} className='tag-mic' />
          <td id={`${tag.id}-humid`} className='tag-humid' />
          <td id={`${tag.id}-baro`} className='tag-baro' />
          <td id={`${tag.id}-uv`} className='tag-uv' />

          <td id={`${tag.id}-temp`} className='tag-temp' />
          <td id={`${tag.id}-alt`} className='tag-alt' />

          <td id={`${tag.id}-w`} className='tag-w' />
          <td id={`${tag.id}-x`} className='tag-x' />
          <td id={`${tag.id}-y`} className='tag-y' />
          <td id={`${tag.id}-z`} className='tag-z' />
        </tr>
      )
    })

    return (
      <div className='main-container'>
        <table className='device-list'>
          <thead>
            <tr
              id='meta-header'
              className={this.state.brokerConnection ? 'connected-bg' : 'disconnected-bg'}
            >
              <th colSpan='3'>Metadata</th>
              <th colSpan='1'>event</th>
              <th colSpan='4'>envHi</th>
              <th colSpan='2'>envLo</th>
              <th colSpan='4'>orient</th>
            </tr>
            <tr
              id='header'
            >
              <th id='header-id'>id</th>
              <th id='header-last-heard'>name</th>
              <th id='header-last-heard'>last heard</th>
              <th id='header-bad-bend'>bad_bend</th>

              <th id='header-mic'>mic</th>
              <th id='header-humid'>humid</th>
              <th id='header-baro'>baro</th>
              <th id='header-uv'>uv</th>

              <th id='header-temp'>temp</th>
              <th id='header-alt'>alt</th>

              <th id='header-w'>w</th>
              <th id='header-x'>x</th>
              <th id='header-y'>y</th>
              <th id='header-z'>z</th>
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
