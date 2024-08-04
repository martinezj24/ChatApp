import { useEffect, useState } from "react"
import { socket } from "../socket"
import { Container, ListGroup, ListGroupItem } from "react-bootstrap"

interface Message {
    data: string
}

const ChatBody = () => {
    const [messages, setMessages] = useState<Message[]>([])
    console.log(messages)

    useEffect(() => {
        socket.on('message', (emittedMessage) => {
            setMessages([...messages, emittedMessage])
        })
    }, [messages])
  return (
    <Container>
        <ListGroup>
            {messages.map((message, idx) => (
                <ListGroupItem key={idx}>{message.data}</ListGroupItem>
            ))}
        </ListGroup>
    </Container>
  )
}

export default ChatBody