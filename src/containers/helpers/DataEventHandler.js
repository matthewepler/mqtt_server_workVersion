const DataEventHandler = {
  handleEventEvent: (deviceId, data) => {
    // console.log('handling Event event')
  },

  handleOrientEvent: (deviceId, data) => {
    typicalAxialEvent(deviceId, data.data[0], 'orient')
  },

  handleMagnoEvent: (deviceId, data) => {
    typicalAxialEvent(deviceId, data.data[0], 'magno')
  },

  handleAccelEvent: (deviceId, data) => {
    typicalAxialEvent(deviceId, data.data[0], 'accel')
  },

  handleGyroEvent: (deviceId, data) => {
    typicalAxialEvent(deviceId, data.data[0], 'gyro')
  },

  handleOtherEvent: (deviceId, data) => {
    for (let key in data.data) {
      updateInnerHTML(`${deviceId}-${key}`, data.data[key])
    }
  }
}

function typicalAxialEvent (deviceId, data, typeString) {
  for (let key in data) {
    if (key !== 'timestamp') {
      let elementIdStr = `${deviceId}-`
      if (typeString) elementIdStr += `${typeString}-`
      elementIdStr += `${key.toLowerCase()}`
      updateInnerHTML(elementIdStr, data[key])
    }
  }
}

function updateInnerHTML (idString, datum) {
  try {
    document.getElementById(idString).innerHTML = toTwoDecimalPlaces(datum)
  } catch (err) {
    // console.log(`could not update innerHTML for ${idString}`)
    // console.log(err)
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
