import { Manager, Socket } from 'socket.io-client'

export function connectToServer() {
  const manager =  new Manager('localhost:3000/socket.io/socket.io.js')
  const socket = manager.socket('/')

  addListeners(socket)
}

function addListeners(socket: Socket) {
  const serverStatusLabel = document.getElementById('server-status')!

  socket.on('connect', () => {
    serverStatusLabel.innerHTML = 'connected'
  })

  socket.on('disconnect', () => {
    serverStatusLabel.innerHTML = 'disconnected'
  })
}
