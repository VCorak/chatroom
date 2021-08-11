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
    socket.on('sendAll', (target) =>{
        io.emit("displayMessage", (target));
    });

});


server.listen(port, () =>{
    console.log("server running on "+ port);
});

