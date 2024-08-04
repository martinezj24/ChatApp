from flask import Flask
from flask_socketio import SocketIO

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins='*')

# receiving a message
@socketio.on('message')
def handle_message(data):
    print('received message: ', data)
    socketio.emit('message', data)

# when a client connects or disconnects from the server
@socketio.on('connect')
def handle_connect():
    print('Client Connected')

@socketio.on('disconnect')
def handle_disconnect():
    print('Client Disconnected')



if __name__ == '__main__':
    socketio.run(app)