import { useState } from 'react';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import './styles/App.css';
import Lobby from './components/Lobby';

const App = () => {
  const [connection, setConnection] = useState();
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

  const joinRoom = async (user, room) => {
    try {
      const connection = new HubConnectionBuilder()
        .withUrl("http://localhost:5269/chatHub")
        .configureLogging(LogLevel.Information)
        .build()

      connection.on("ReceiveMessage", (user, message) => {
        setMessages(messages => [...messages, { user, message }])
      })

      connection.on("UsersInRoom", (users) => {
        setUsers(users)
      })

      connection.onclose(e => {
        setConnection()
        setMessages([])
        setUsers([])
      })

      await connection.start()
      await connection.invoke("JoinRoom", { user, room })
      setConnection(connection)
    } catch (e) {
      console.log(e)
    }
  }

  const sendMessage = async (message) => {
    try {
      await connection.invoke("SendMessage", message)
    } catch (e) {
      console.log(e)
    }
  }

  const closeConnection = async () => {
    try {
      await connection.stop()
    } catch (e) {
      console.log(e)
    }
  }

  return <div className='app'>
    <h2>RandomChat</h2>
    <hr className='line' />
    <Lobby joinRoom={joinRoom}></Lobby>
  </div>

}

export default App;