import { connectToServer } from './socket-client'
import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>WebSocket - Client</h1>

    <input id="jwt-token" placeholder="JSON Web Token" />
    <button id="btn-connect">Connect</button>

    <br/>

    <span id="server-status">offline</span>

    <ul id="clients-ul"></ul>

    <form id="message-form">
      <input id="message-input" placeholder="message" />
    </form>

    <h3>Messages</h3>
    <ul id="messages-ul"></ul>
  </div>
`
const jwtToken = document.querySelector<HTMLInputElement>('#jwt-token')!
const btnConnect = document.querySelector<HTMLButtonElement>('#btn-connect')!

btnConnect.addEventListener('click', () => {
  const value = jwtToken.value.trim()

  if(value.length === 0) {
    return alert('Enter a valid JWT')
  }

  connectToServer(value)
})
