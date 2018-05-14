import io from 'socket.io-client'

const socket = io.connect('http://10.68.0.239:3001')

export default socket


