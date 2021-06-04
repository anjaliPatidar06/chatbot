const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)

app.use('/style', express.static(__dirname + '/style'))
app.get('/newnlu', (req, res) => res.sendFile(__dirname + '/newnlu.vue'))

io.on('connection', (socket) => {
  socket.username = 'anonymous';
  socket.on('change username', (name) => socket.username = name)
  socket.on('message', (msg) => io.emit('message',
  { 'user': socket.username, 'message': msg }))
  socket.on('join', (username) => {
    if (username != null) {
      socket.username = username
    }
    socket.broadcast.emit('message',
    { 'user': 'Server', 'message': socket.username + ' has joined!'})
  })
})

http.listen(7000, () => console.log('listening on port 7000'))