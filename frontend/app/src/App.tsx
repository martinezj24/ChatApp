import { useEffect, useState } from "react"
import { socket } from "./socket"
import { Button, Container } from "react-bootstrap"
import MessageInput from "./components/MessageInput"
import ChatBody from "./components/ChatBody"

const App = () => {
  const [isConnected, setIsConnected] = useState(socket.connected)
  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to Server')
      setIsConnected(true)
    })
    socket.on('disconnect', () => {
      console.log('Disconnected from Server')
      setIsConnected(false)
    })

    return () => {
      socket.off('connect')
      socket.off('disconnect')

    }
  }, [])
  return (
    <Container>
      <h1>MyChat App</h1>
      {!isConnected ? (
        <Button onClick={() => socket.connect()}>Connect to Chatroom</Button>
      ) : (
        <>
        <ChatBody/>
        <MessageInput/>
        <Button variant="danger" onClick={() => socket.connect()}>Leave Chatroom</Button>
        </>
        )}
    </Container>
  )
}

export default App