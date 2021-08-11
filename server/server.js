const express = require('express');
const http = require('http');
const app = express();
const clientPath = `${__dirname}/../client`;
app.use(express.static(clientPath));
const server = http.createServer(app);
const port = 9020;


server.listen(9020, () =>{
    console.log("server running on "+ port);
});

//const io is entry point of all sockets connected to the serve
const io = require('socket.io')(server);

//connection from the client
io.on('connection', (socket) => {
    console.log('someone connected');
});



