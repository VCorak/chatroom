let socket = io.connect();

// When we press the button on the client, because of our emit on the client, the server will receive the 'sendToAll' call and execute the piece of code within on the server

let sendAll = document.getElementById('sendAll');
sendAll.addEventListener("click", () => {
    input = document.getElementById("input").value;
    socket.emit('sendAll', (input));
})

// We have now sent the message from the client to the server, now we just need to receive it back from the server.
//So now the client is waiting for the call to 'displayMessage' and then it will add that message to your target div.
socket.on("displayMessage", (input) => {
target = document.getElementById('target');
target.innerHTML += "<br>" + input;
})