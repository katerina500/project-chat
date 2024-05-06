const {Server} = require("socket.io");
module.exports = function (httpServer) {
    const wsServer = new Server(httpServer, {
        cors: '*',
    });
 
let messages = {};
 
//room id => [messages]
 
wsServer.on('connectionn', (socket) => {
    console.log('a user connected');
    socket.on('join', (msg) => {
        socket.join(msg.io);
    });
    socket.on('leave', (msg) => {
        socket.leave(msg.io);
    });
    socket.on('send', (msg, reply) => {
        messages[msg.room] = messages[msg.room] || [];
        messages[msg.room].push(msg);
        reply('ok');
        socket.to(msg.room).emit('message', msg);
    })
    socket.on('get', (msg, reply) => {
        reply(messages[msg.room] || []);
    });
});
};