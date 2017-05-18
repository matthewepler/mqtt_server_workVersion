const DataEventHandler = {
  handleEventEvent: (deviceId, data, tagIndex) => {
    // console.log('handling Event event')
  },

  handleOrientEvent: (deviceId, data, tagIndex) => {
    for (let key in data.data[0]) { // read first packet in array only
      if (key !== 'timestamp') {
        updateInnerHTML(`${deviceId}-orient-${key.toLowerCase()}`, data.data[0][key])
      }
    }
  },

  handleMagnoEvent: (deviceId, data, tagIndex) => {
    // console.log('handling Magno event')
  },

  handleAccelEvent: (deviceId, data, tagIndex) => {
    // console.log('handling Accel event')
  },

  handleGyroEvent: (deviceId, data, tagIndex) => {
    // console.log('handling Gryo event')
  },

  handleOtherEvent: (deviceId, data, tagIndex) => {
    for (let key in data.data) {
      updateInnerHTML(`${deviceId}-${key}`, data.data[key])
    }
  }
}

function updateInnerHTML (idString, datum) {
  try {
    document.getElementById(idString).innerHTML = toTwoDecimalPlaces(datum)
  } catch (err) {
    console.log(`could not update innerHTML for ${idString}`)
    console.log(err)
  }
}

function toTwoDecimalPlaces (numString) {
  numString = String(numString)
  if (numString.indexOf('.') > 0) {
    let splitString = numString.split('.')
    splitString[1] = splitString[1].slice(0, 2)
    return splitString.join('.')
  } else {
    return numString
  }
}

export default DataEventHandler
