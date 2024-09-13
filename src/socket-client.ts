import { Manager, Socket } from 'socket.io-client'

interface MessageResponse {
  fullName: string
  message: string
}

export function connectToServer() {
  const manager =  new Manager('localhost:3000/socket.io/socket.io.js')
  const socket = manager.socket('/')

  addListeners(socket)
}

function addListeners(socket: Socket) {
  const serverStatus = document.querySelector<HTMLSpanElement>('#server-status')!
  const clientsUl = document.querySelector<HTMLUListElement>('#clients-ul')!
  const messageForm = document.querySelector<HTMLFormElement>('#message-form')!
  const messageInput = document.querySelector<HTMLInputElement>('#message-input')!
  const messagesUl = document.querySelector<HTMLUListElement>('#messages-ul')!


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

  messageForm.addEventListener('submit', (event) => {
    event.preventDefault()

    if(messageInput.value.trim().length === 0) return

    socket.emit('message-from-client', { message: messageInput.value })

    messageInput.value = ''
  })

  socket.on('message-from-server', ({ fullName, message }: MessageResponse) => {
    let messageHtml = `
      <strong>${fullName}</strong>
      <span>${message}</span>
    `

    const li = document.createElement('li')

    li.innerHTML = messageHtml

    messagesUl.append(li)
  })
}
