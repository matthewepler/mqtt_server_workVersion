// server/app.js

var express = require('express')
var morgan = require('morgan')
var path = require('path')
var stormpath = require('express-stormpath')
var helmet = require('helmet')
require('dotenv').config()

var app = express()

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'))

// Stormpath for Authentication
app.use(stormpath.init(app, {
  apiKey: {
    id: '5CSZNF83FF4TKV61CA72EKUU0',
    secret: process.env.SPSECRET
  },
  application: {
    href: `https://api.stormpath.com/v1/applications/4zQHDN4puLolDAy1ZxNB0G`
  },
  web: {
    login: {
      enabled: true,
      nextUri: '/dashboard'
    },
    logout: {
      enabled: true,
      uri: '/logout',
      nextUri: '/login'
    },
    me: {
      enabled: false
    },
    register: {
      enabled: false
    }
  },
  preLoginHandler: function (formData, req, res, next) {
    console.log('Got login request', formData)
    console.log('*** @preLoginHandler: req.protocol === ', req.protocol)

    res.set({
      'x_forwarded_proto': 'https'
    })

    next()
  }
}))

// Helmet for enforcing HTTPS
// Sets "Strict-Transport-Security: max-age=5184000; includeSubDomains".
var sixtyDaysInSeconds = 5184000
app.use(helmet.hsts({
  force: true,
  maxAge: sixtyDaysInSeconds
}))

app.on('stormpath.ready', function () {
  console.log('Stormpath Ready!')
})

app.get('/', (req, res) => {
  console.log('*** @/: req.protocol === ', req.protocol)
  if (!req.secure) {
    console.log('*** @preLoginHander: insecure request, redirecting')
    res.redirect('https://' + req.hostname + '/login')
  } else {
    res.redirect('/login')
  }
})

app.get('/dashboard', stormpath.authenticationRequired, (req, res) => {
  console.log('@/dashboard: secure? ', req.secure)
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'))
})

// use this simplified route when testing with 'heroku local web'
// app.get('/', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'))
// })

app.use(express.static(path.resolve(__dirname, '..', 'build')))

module.exports = app
