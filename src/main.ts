import { connectToServer } from './socket-client'
import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>WebSocket - Client</h1>

    <span id="server-status"></span>

    <ul id="clients-ul"></ul>
  </div>
`

connectToServer()
