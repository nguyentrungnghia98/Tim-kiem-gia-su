const socketIo = require("socket.io");
const User = require('../models/user');

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
    let userID;

    socket.on('login', id => {
      console.log('login ', id);
      userID = id;
    })

    socket.on('join', (data) => {
      me = data.me;
      other = data.other;
      console.log(data)
      room = genarateRoom(me, other);
      socket.join(room);

      io.to(room).emit('users-changed', { room: room, event: 'joined' })

    });
 
    socket.on('add-message', (message) => {
        io.to(room).emit('new-message', message);
    });

    socket.on('disconnect',  () => {
        try{
          console.log('disconnect')
          if(userID) User.updateOne({_id: userID}, {isOnline: false})
        }catch(err){
          console.log( err)
        }
    });
  })
}