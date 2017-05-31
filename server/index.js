import app from './app'
import http from 'http'
import connectToIBM from './ibmClient'
import connectToDummyBroker from './dummyBroker'
import dotenv from 'dotenv'
import IO from 'socket.io'

dotenv.config()
const server = http.Server(app)
const PORT = process.env.PORT || 5000

server.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`)
})

// SOCKET STUFF
const io = IO(server)

io.on('connection', function (socket) {
  console.log('server has io connection, yo!')
})

if (process.env.NODE_ENV === 'production') {
  connectToIBM(io)
} else if (process.env.NODE_ENV === 'development') {
  connectToDummyBroker(io)
}
