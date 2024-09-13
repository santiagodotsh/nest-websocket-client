import { Manager, Socket } from 'socket.io-client'

export function connectToServer() {
  const manager =  new Manager('localhost:3000/socket.io/socket.io.js')
  const socket = manager.socket('/')

  addListeners(socket)
}

function addListeners(socket: Socket) {
  const serverStatus = document.getElementById('server-status')!
  const clientsUl = document.getElementById('clients-ul')!

  socket.on('connect', () => {
    serverStatus.innerHTML = 'connected'
  })

  socket.on('disconnect', () => {
    serverStatus.innerHTML = 'disconnected'
  })

  socket.on('clients-updated', (clientIds: string[]) => {
    let clientsHtml = ''

    clientIds.forEach(id => clientsHtml += `<li>${id}</li>`)

    clientsUl.innerHTML = clientsHtml
  })
}
