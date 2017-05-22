var deviceIds = ['111111', '222222', '333333', '444444', '555555']
var eventTypes = [
  'motion',
  'event',
  'envhi',
  'envlo',
  'orient',
  'accel',
  'magno',
  'gyro',
  'meta'
]
var motions = [
  'bad_bend',
  'step',
  'trip',
  'slip',
  'squat',
  'twist',
  'reach',
  'jump'
]

var events = [
  'fall',
  'struck-by',
  'button-press-safety',
  'button-press-emergency',
  'noise',
  'vibration',
  'motion',
  'heat',
  'cold',
  'gait'
]

function getRandomArbitrary (min, max) {
  return (Math.random() * (max - min)) + min
}

function buildMotionEvent (id) {
  return {
    'id': 'see id# in parent object',
    'type': 'motion',
    'timestamp': Date.now(),
    'data': {
      'data': 'ON',
      'eventType': motions[Math.floor(Math.random() * motions.length)],
      'timestamp': Date.now()
    }
  }
}

function buildEventEvent (id) {
  return {
    'id': 'see id# in parent object',
    'type': 'event',
    'timestamp': Date.now(),
    'data': {
      'data': 'ON',
      'eventType': events[Math.floor(Math.random() * events.length)],
      'timestamp': Date.now()
    }
  }
}

function buildEnvHiEvent (id) {
  return {
    'id': 'see id# var in parent object',
    'type': 'envHi',
    'timestamp': Date.now(),
    'data': {
      'baro': getRandomArbitrary(300.0, 1100.0),
      'humid': getRandomArbitrary(0.0, 100.0),
      'mic': getRandomArbitrary(1.0, 1023.0),
      'uv': getRandomArbitrary(0.0, 10.0) // N/A
    }
  }
}

function buildEnvLoEvent (id) {
  return {
    'id': 'see id# var in parent object',
    'type': 'envlo',
    'timestamp': Date.now(),
    'data': {
      'temp': getRandomArbitrary(0.0, 65.0),
      'alt': getRandomArbitrary(-698.38, 9164.60)
    }
  }
}

function buildOrientEvent (id) {
  return {
    'id': 'see id# var in parent object',
    'type': 'orient',
    'timestamp': Date.now(),
    'data': [{
      'x': getRandomArbitrary(0.0, 180.0),
      'y': getRandomArbitrary(0.0, 90.0),
      'z': getRandomArbitrary(0.0, 180.0)
    }]
  }
}

function buildAccelEvent (id) {
  return {
    'id': 'see id# var in parent object',
    'type': 'accel',
    'timestamp': Date.now(),
    'data': [{
      'x': getRandomArbitrary(-19.62, 19.62),
      'y': getRandomArbitrary(-19.62, 19.62),
      'z': getRandomArbitrary(-19.62, 19.62)
    }]
  }
}

function buildMagnoEvent (id) {
  return {
    'id': 'see id# var in parent object',
    'type': 'magno',
    'timestamp': Date.now(),
    'data': [{
      'x': getRandomArbitrary(-4800, 4800),
      'y': getRandomArbitrary(-4800, 4800),
      'z': getRandomArbitrary(-4800, 4800)
    }]
  }
}

function buildGyroEvent (id) {
  return {
    'id': 'see id# var in parent object',
    'type': 'gyro',
    'timestamp': Date.now(),
    'data': [{
      'x': getRandomArbitrary(-2000, 2000),
      'y': getRandomArbitrary(-2000, 2000),
      'z': getRandomArbitrary(-2000, 2000)
    }]
  }
}

function buildMetaEvent (id) {
  return {
    'id': 'see id# var in parent object',
    'type': 'magno',
    'timestamp': Date.now(),
    'data': {
      'batt': getRandomArbitrary(3.0, 4.2),
      'ext': 'n/a',
      'ver': 'n/a'
    }
  }
}

var buildData = {
  motion: (id) => { return buildMotionEvent(id) },
  event: (id) => { return buildEventEvent(id) },
  envhi: (id) => { return buildEnvHiEvent(id) },
  envlo: (id) => { return buildEnvLoEvent(id) },
  orient: (id) => { return buildOrientEvent(id) },
  accel: (id) => { return buildAccelEvent(id) },
  magno: (id) => { return buildMagnoEvent(id) },
  gyro: (id) => { return buildGyroEvent(id) },
  meta: (id) => { return buildMetaEvent(id) }
}

var connectToDummyBroker = function (io) {
  io.emit('socket_connected', {})

  deviceIds.forEach(function (id) {
    setInterval(function () {
      eventTypes.forEach(function (eventType) { // mimics IBM format
        var data = buildData[eventType](id)

        io.emit('deviceEvent', {
          deviceType: 'hcs_tag',
          deviceId: id,
          eventType: eventType,
          format: 'json',
          data: data
        })
      })
    }, 1000)
  })
}

module.exports = connectToDummyBroker
