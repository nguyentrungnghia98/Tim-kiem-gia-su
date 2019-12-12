const socketIo = require("socket.io");


function genarateRoom(email1, email2){
  const tmp = [email1, email2];
  return tmp.sort().join("")
}

module.exports = function(server) {
  const io = socketIo(server).listen(server);

  io.on("connection", function(socket) {

  })
}