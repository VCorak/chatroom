const express = require('express');
const http = require('http');
const app = express();
const clientPath = `${__dirname}/../client`;
app.use(express.static(clientPath));
const server = http.createServer(app);
const port = 9020;
let counter = 0;



//const io is entry point of all sockets connected to the serve
const io = require('socket.io')(server);

const users = {};


//connection from the client
io.on('connection', (socket) => {
    // user name
    socket.on('new-user', name => {
    users[socket.id] = name;
    socket.emit('user-connected', name);
    })
//increment counter
    counter++;
    console.log(counter+ ' someone connected');

    // This is an observer that waits until the message "sendToAll" gets passed to the server
    socket.on('sendAll', (input) => {
        const name = users[socket.id];
        // The io.emit on the server means that the server will now send the call to 'displayMessage' to ALL clients connected and also passes the message back as a parameter
        io.emit("displayMessage", { input: input, name: name} );
        console.log(input, name);
    });
    socket.on('sendMe', (input) => {
        const name = users[socket.id];
        // Now instead of doing an io.emit, we are going to do a socket.emit. The difference here is that if you emit to io,
        // all connected clients will receive the message,
        // whereas the socket.emit will only send it back to the socket of which it received the message.
        socket.emit("displayMessage", { input: input, name: name} );
    });
});




server.listen(port, () =>{
    console.log("server running on "+ port);
});

