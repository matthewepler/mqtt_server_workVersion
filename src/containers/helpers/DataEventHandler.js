const DataEventHandler = {
  handleMotionEvent: (deviceId, data, toggles) => {
    if (toggles['motions']) {
      try {
        const element = document.getElementById(`${deviceId}-${data.data.eventType}-pill-count`)
        element.innerHTML = parseInt(element.innerHTML, 10) + 1
      } catch (err) {
        console.log(`exception @ handleMotionEvent: ${deviceId}: ${data.data.eventType}`)
      }

      const pill = document.getElementById(`${deviceId}-${data.data.eventType}-pill`)
      pill.classList.add('ping-border-blue')
      pill.addEventListener('animationend', function () {
        pill.classList.remove('ping-border-blue')
      })

      const pillLabel = document.getElementById(`${deviceId}-${data.data.eventType}-pill-left`)
      pillLabel.classList.add('ping-background-blue')
      pillLabel.addEventListener('animationend', function () {
        pillLabel.classList.remove('ping-background-blue')
      })
    }
  },

  handleEventEvent: (deviceId, data, toggles) => {
    if (toggles['events']) {
      try {
        const element = document.getElementById(`${deviceId}-${data.data.eventType}-pill-count`)
        element.innerHTML = parseInt(element.innerHTML, 10) + 1
      } catch (err) {
        console.log(`exception @ handleEventEvent: ${deviceId}: ${data.data.eventType}`)
      }

      const pill = document.getElementById(`${deviceId}-${data.data.eventType}-pill`)
      pill.classList.add('ping-border-orange')
      pill.addEventListener('animationend', function () {
        pill.classList.remove('ping-border-orange')
      })

      const pillLabel = document.getElementById(`${deviceId}-${data.data.eventType}-pill-left`)
      pillLabel.classList.add('ping-background-orange')
      pillLabel.addEventListener('animationend', function () {
        pillLabel.classList.remove('ping-background-orange')
      })
    }
  },

  handleOrientEvent: (deviceId, data, toggles) => {
    if (toggles['orientation']) {
      if (!data.data) {
        console.log('data for orient event is invalid')
        return
      }
      typicalAxialEvent(deviceId, data.data[0], 'orient')
    }
  },

  handleMagnoEvent: (deviceId, data, toggles) => {
    if (toggles['magno']) {
      if (!data.data) {
        console.log('data for magno event is invalid')
        return
      }
      typicalAxialEvent(deviceId, data.data[0], 'magno')
    }
  },

  handleAccelEvent: (deviceId, data, toggles) => {
    if (toggles['accel']) {
      if (!data.data) {
        console.log('data for accel event is invalid')
        return
      }
      typicalAxialEvent(deviceId, data.data[0], 'accel')
    }
  },

  handleGyroEvent: (deviceId, data, toggles) => {
    if (toggles['gyro']) {
      if (!data.data) {
        console.log('data for gyro event is invalid')
        return
      }
      typicalAxialEvent(deviceId, data.data[0], 'gyro')
    }
  },

  handleOtherEvent: (deviceId, data, toggles, eventType) => {
    if (toggles[eventType]) {
      for (let key in data.data) {
        updateInnerHTML(`${deviceId}-${key}`, data.data[key])
      }
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
