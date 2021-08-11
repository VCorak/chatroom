const express = require('express');
const http = require('http');
const app = express();
const clientPath = `${__dirname}/../client`;
app.use(express.static(clientPath));
const server = http.createServer(app);
const port = 9020;


//const io is entry point of all sockets connected to the serve
const io = require('socket.io')(server);

//connection from the client
let counter = 0;
io.on('connection', (socket) => {
//increment counter
    counter++;
    console.log(counter+ ' someone connected');
    // This is an observer that waits until the message "sendToAll" gets passed to the server
    socket.on('sendAll', (target) => {
        // The io.emit on the server means that the server will now send the call to 'displayMessage' to ALL clients connected and also passes the message back as a parameter
        io.emit("displayMessage", (target));
    });
    socket.on('sendMe', (target) => {
        // Now instead of doing an io.emit, we are going to do a socket.emit. The difference here is that if you emit to io,
        // all connected clients will receive the message,
        // whereas the socket.emit will only send it back to the socket of which it received the message.
        socket.emit("displayMessage", (target));
    });
});


server.listen(port, () =>{
    console.log("server running on "+ port);
});

