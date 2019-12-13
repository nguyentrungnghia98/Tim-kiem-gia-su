const socketIo = require("socket.io");


function genarateRoom(email1, email2) {
  const tmp = [email1, email2];
  return tmp.sort().join("")
}

module.exports = function (server) {
  const io = socketIo(server).listen(server);

  io.on("connection", function (socket) {
    //me, other = {username:'',email:'',...}
    let me ="";
    let other = "";
    let room = 0;
    socket.on('join', (data) => {
      me = data.me;
      other = data.other;

      room = genarateRoom(me.email, other.email);
      socket.join(room);

      io.to(room).emit('users-changed', { user: room, event: 'joined' })

    });

    socket.on('add-message', (message) => {
      try {
        let data = { content: message.message, from: me._id, createAt: new Date() }
        
        io.to(room).emit('message', data);
        // call API add message
      } catch (err) {
        console.log(err)
        io.to(room).emit('error', {
          message: 'something wrong'
        })
      }
    });
  })
}