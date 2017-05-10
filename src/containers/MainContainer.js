import React, { Component } from 'react'
import sheetsu from 'sheetsu-node'
import io from 'socket.io-client'

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
      dbConnected: false
    }

    this.workerData = []

    // a collection of objects that contain deviceId, and lastHeard timestamp.
    // used to determine if the tag is still 'active'.
    // seperated from state because of the frequency of updates.
    this.heartbeats = []
    this.heartbeatInterval = null // placeholder for interval timer object
    this.heartbeatTimer = 1000
    this.activeThreshold = 10000
    this.heartbeatThreshold = 60000 // check every X ms for tag status

    this.debug = false
  }

  componentWillMount () {
    this.connectToDB()
  }

  componentDidMount () {
    var socket = io()

    socket.on('ibm_connected', (data) => {
      console.log('connected to IBM')
      this.setState({ brokerConnection: true })
      this.heartbeatInterval = setInterval(() => {
        this.checkHeartbeat()
      }, this.heartbeatTimer)
    })

    socket.on('disconnect', () => {
      this.killAllAndRevive()
    })

    socket.on('deviceEvent', (eventData) => {
      // console.log(eventData);

      if (eventData.eventType === 'event' && eventData.data.data.data === 'ON') {
        console.log(`event from device#: ${eventData.deviceId}`)
      }

      // check to see if this tag is already in the list of active tags
      const tagIndex = this.heartbeats.findIndex((obj) => {
        return obj.id === eventData.deviceId
      })

      // if it's not, add it to the list of active tags
      if (tagIndex < 0) {
        this.addTag(eventData.deviceId)
      } else {
        // update the tag with the payload data
        this.updateTag(eventData.deviceId, eventData.eventType, eventData.data, tagIndex)
      }
    })
  }

  connectToDB () {
    var config = {
      address: 'https://sheetsu.com/apis/v1.0/2731f699ff68'
    }

    this.dbClient = sheetsu(config)

    this.dbClient.read().then((data) => {
      this.workerData = JSON.parse(data)
      this.setState({ dbConnected: true })
    }, (err) => {
      console.log('Error with Sheetsu connection.', err)
    })
  }

  addTag (id) {
    const activeTags = this.state.activeTags
    activeTags.push({
      id,
      name: 'unknown',
      site: 'unknown'
    })
    this.setState({ activeTags })

    this.heartbeats.push({
      id,
      lastHeard: getCurrTimeString()
    })
  }

  updateTag (deviceId, eventType, data, tagIndex) {
    // updates are done with direct DOM manipulation for efficiency
    // also, calling this.setState() does not guarantee when the change will
    // take place immediately since state updates result in a pending state.

    // data payloads eventType is either 'event' (something bad) or r
    // regular updates that bear the name of the data type, i.e. 'orient'

    // update the 'last heard' timestamp so we know if it's active
    this.heartbeats[tagIndex].lastHeard = Date.now()
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

    // check for name and site in DB if it's not already known
    const activeTags = this.state.activeTags
    if (activeTags[tagIndex].name === 'unknown' && this.state.dbConnected) {
      const worker = this.workerData.find((worker) => {
        return worker.id === deviceId
      })
      if (worker) {
        activeTags[tagIndex].name = worker.name
        activeTags[tagIndex].site = worker.site
        this.setState({ activeTags })
      }
    }
  }

  checkHeartbeat () {
    // for each item in the heartbeats array
    this.heartbeats.forEach((obj) => {
      // compare the lastHeard value to the current time
      const diff = Date.now() - new Date(obj.lastHeard).getTime()

      if (diff > this.activeThreshold) {
        // manually switch the class (color)
        document.getElementById(`${obj.id}`).classList.add('status-inactive')
      } else {
        const classList = document.getElementById(`${obj.id}`).classList
        if (classList.value.includes('status-inactive')) {
          document.getElementById(`${obj.id}`).classList.remove('status-inactive')
        }
      }

      // if the diff is > our threshold (set in constructor)
      if (diff > this.heartbeatThreshold) {
        // remove it from this.state.activeTags
        const temp = this.state.activeTags
        const index = temp.findIndex((ATobj) => {
          return ATobj.id === obj.id
        })
        temp.splice(index, 1)
        this.setState({
          activeTags: temp
        })
         // remove it from this.heartbeats
        this.heartbeats.splice(index, 1)
      }
    })
  }

  killAllAndRevive () {
    console.log('killAllAndRevive()')
    this.setState({ brokerConnection: false })
    clearInterval(this.heartbeatInterval)
    // setTimeout(() => { this.initConnection() }, 5000)
  }

  render () {
    const allTags = this.state.activeTags.map((tag, index) => {
      return (
        <tr id={tag.id} className='tag-row status-good' key={index}>
          <td id={`${tag.id}-id`} className='tag-id'>{tag.id}</td>
          <td id={`${tag.id}-name`} className='tag-name'>{tag.name}</td>
          <td id={`${tag.id}-site`} className='tag-site'>{tag.site}</td>
          <td id={`${tag.id}-last-heard`} className='tag-last-heard' />
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
        <div className='nav-bar' >
          <img
            src='img/light_hexagon.svg'
            alt='refresh'
            onClick={() => { this.killAllAndRevive() }}
          />
          <form name='logout' action='/logout' method='post'>
            <button type='submit'>Logout</button>
          </form>
        </div>
        <table className='device-list'>
          <thead>
            <tr
              id='meta-header'
              className={this.state.brokerConnection ? 'connected-bg' : 'disconnected-bg'}
            >
              <th id='meta-header-metadata' colSpan='4'>Metadata</th>
              <th id='meta-header-event' colSpan='1'>event</th>
              <th id='meta-header-envHi' colSpan='4'>envHi</th>
              <th id='meta-header-envLo' colSpan='2'>envLo</th>
              <th id='meta-header-orient' colSpan='4'>orient</th>
            </tr>
            <tr
              id='header'
            >
              <th id='header-id'>id</th>
              <th id='header-last-heard'>name</th>
              <th id='header-site'>site</th>
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
