const DataEventHandler = {
  handleEventEvent: (deviceId, data, tagIndex) => {
    console.log('handling Event event')
  },

  handleOrientEvent: (deviceId, data, tagIndex) => {
    console.log('handling Orient event')
  },

  handleMagnoEvent: (deviceId, data, tagIndex) => {
    console.log('handling Magno event')
  },

  handleAccelEvent: (deviceId, data, tagIndex) => {
    console.log('handling Accel event')
  },

  handleGyroEvent: (deviceId, data, tagIndex) => {
    console.log('handling Gryo event')
  },

  handleOtherEvent: (deviceId, data, tagIndex) => {
    for (let key in data.data) {
      let datum
      if (data.data[key].indexOf('.') > 0) {
        let splitString = data.data[key].split('.')
        splitString[1] = splitString[1].slice(0, 2)
        datum = splitString.join('.')
      } else {
        datum = data.data[key]
      }
      try {
        document.getElementById(`${deviceId}-${key}`).innerHTML = datum
      } catch (err) {
        console.log(`could not update innerHTML for ${deviceId}-${key}`)
      }
    }
  }
}

export default DataEventHandler
