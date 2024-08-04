import { useEffect, useState } from "react";
import { socket } from "../socket";
import { Container, ListGroup, ListGroupItem } from "react-bootstrap";

interface Message {
    username: string;
    data: string;
    timestamp: string;
}

const ChatBody = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [usernameFilter, setUsernameFilter] = useState<string>('');

    useEffect(() => {
        socket.on('message', (emittedMessage: Message) => {
            setMessages(prevMessages => [...prevMessages, emittedMessage]);
        });

        return () => {
            socket.off('message');
        };
    }, []);

    return (
        <Container>
            <input
                type="text"
                placeholder="Filter by username"
                onChange={(e) => setUsernameFilter(e.target.value)}
            />
            <ListGroup>
                {messages
                    .filter(message => message.username.toLowerCase().includes(usernameFilter.toLowerCase()))
                    .map((message, idx) => (
                        <ListGroupItem key={idx}>
                            <div>
                                <strong>{message.username}</strong> <span className="text-muted">{new Date(message.timestamp).toLocaleTimeString()}</span>
                            </div>
                            <div>{message.data}</div>
                        </ListGroupItem>
                    ))}
            </ListGroup>
        </Container>
    );
};

export default ChatBody;
