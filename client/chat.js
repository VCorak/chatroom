let socket = io.connect();

let sendAll = document.getElementById('sendAll');
sendAll.addEventListener("click", () => {
    input = document.getElementById("input").value;
    socket.emit('sendAll', (input));
})

socket.on("displayMessage", (input) => {
target = document.getElementById('target');
target.innerHTML += "<br>" + input;
})