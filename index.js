/*https://bablofil.ru/nodejs-websocket-chat/*/

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = 3000;

app.get('/', (req, res) => {
    //res.send('<h1>Hello world!!!</h1>')
    res.sendFile(__dirname + '/index.html')
});

http.listen(port, () => {
    console.log('listening port 3000 ....')
});

let numUsers = 0;

/*Если мы хотим отправить сообщение всем, кроме определенного
сокета, вы можете воспользоваться флагом broadcast:*/

io.on('connection', function (socket) {
    console.log('a user connected');
    var addedUser = false;

    socket.on('chat message', function (msg) {
        io.emit('chat message', msg);
    });

    socket.on('disconnect', function () {
        console.log('a user disconnected');
    })

    socket.on('add user', (username) => {
        if (addedUser) return;

        // we store the username in the socket session for this client
        socket.username = username;
        numUsers += 1;
        addedUser = true;

    });

});




