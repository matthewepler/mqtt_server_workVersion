
import React, { Component } from 'react'
import sheetsu from 'sheetsu-node'
import io from 'socket.io-client'

// components
import TagRow from '../components/TagRow'

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
      dbConnected: false,
      site: 'All Sites',
      toggles: {
        events: false,
        motions: false,
        envhi: false,
        envlo: false,
        orientation: false
      }
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
        // console.log(`event from device#: ${eventData.deviceId}`)
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
        // this.updateTag(eventData.deviceId, eventData.eventType, eventData.data, tagIndex)
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
        // document.getElementById(`${obj.id}`).classList.add('status-inactive')
      } else {
        // const classList = document.getElementById(`${obj.id}`).classList
        // if (classList.value.includes('status-inactive')) {
        //   document.getElementById(`${obj.id}`).classList.remove('status-inactive')
        // }
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

  handleToggle (e) {
    console.log('this = ', this)
    console.log(e.target.innerHTML.toLowerCase())
    const label = e.target.innerHTML.toLowerCase()
    const toggles = this.state.toggles
    toggles[label] = !toggles[label]
    this.setState({ toggles })
  }

  onFilterChange (e) {
    console.log(e.target.value)
  }

  render () {
    console.log('rendering...')

    const tags = this.state.activeTags.map((tag, index) => {
      if (this.state.site === 'All Sites' || this.state.site === tag.site) {
        return (
          <TagRow
            key={index}
            id={tag.id}
            site={tag.site}
            toggles={this.state.toggles}
          />
        )
      }
    })

    return (
      <div className='main-container'>
        <div className='nav-bar' >
          <img
            src='img/dark_hexagon.svg'
            alt='refresh'
            onClick={() => { this.killAllAndRevive() }}
          />

          <div id='filter-toggle-menu'>
            <div id='filter-menu'>
              <select
                className='filter-button'
                onChange={this.onFilterChange}
                value={this.state.site}
              >
                <option value='all-sites'>All Sites</option>
                <option value='hcs'>HCS</option>
                <option value='51-jay-st'>51 Jay Street</option>
              </select>
            </div>
            <div id='toggle-menu'>
              <div
                className='toggle-button'
                onClick={(event) => this.handleToggle(event)}
                data-label='events'
              >
                Events
              </div>
              <div
                className='toggle-button'
                onClick={(event) => this.handleToggle(event)}
                data-label='events'
              >
                Motions
              </div>
              <div
                className='toggle-button'
                onClick={(event) => this.handleToggle(event)}
                data-label='events'
              >
                EnvHi
              </div>
              <div
                className='toggle-button'
                onClick={(event) => this.handleToggle(event)}
                data-label='events'
              >
                EnvLo
              </div>
              <div
                className='toggle-button'
                onClick={(event) => this.handleToggle(event)}
                data-label='events'
              >
                Orientation
              </div>
            </div>
          </div>

          <form name='logout' action='/logout' method='post'>
            <button type='submit'>Logout</button>
          </form>
        </div>
        <div id='device-list'>
          {tags}
        </div>
      </div>
    )
  }
}

export default MainContainer
