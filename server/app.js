// server/app.js

var express = require('express')
var morgan = require('morgan')
var path = require('path')
var stormpath = require('express-stormpath')
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
  }
}))

app.on('stormpath.ready', function () {
  console.log('Stormpath Ready!')
})

app.get('/', (req, res, next) => {
  console.log(req)
  if (req.secure) {
    console.log('** secure request **')
    res.redirect('/login')
  } else {
    console.log('** insecure request. redirecting. **')
    res.redirect('https://' + req.headers.host + req.url)
  }
})

app.get('/dashboard', stormpath.authenticationRequired, (req, res) => {
  if (req.secure) {
    console.log('** secure request **')
    res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'))
  } else {
    console.log('** insecure request. redirecting. **')
    res.redirect('https://' + req.headers.host + req.url)
  }
})

app.use(express.static(path.resolve(__dirname, '..', 'build')))

module.exports = app
