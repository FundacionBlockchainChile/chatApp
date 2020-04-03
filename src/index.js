const path = require('path')
const http = require('http')
const express = require("express");
const socketio = require('socket.io')
const Filter = require('bad-words')

const app = express();
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))



io.on('connection', (socket) => {
    console.log('New WebSocket Connection')

    socket.emit('message', "Welcome!")
    socket.broadcast.emit('message', 'A new user has join')
    
    socket.on('sendMessagge', (message, callback) => {
        const filter = new Filter()
        if (filter.isProfane(message)) {
            return callback('Profanity is not allowed')
        }

        io.emit('message', message)
        callback('Delivered')
    })

    socket.on('sendLocation', (coords, callback) => {

        io.emit('message', `http://google.com/maps?q=${coords.latitude},${coords.longitude}`)
        callback()
    })

    socket.on('disconnect', () => {
        io.emit('message', 'A user has left...')
    })
})





// SERVER LISTEN TO PORT
server.listen(port, () => console.log("Server is on port " + port));