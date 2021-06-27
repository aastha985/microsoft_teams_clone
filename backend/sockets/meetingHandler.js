const {
    userJoin,
    getCurrentUser,
    userLeave,
  } = require('../utils/users');

module.exports = (io,socket) => {

    const joinMeeting = (meetingCode, userId,username) => {
        const user = userJoin(socket.id,username,meetingCode);
        socket.join(meetingCode);
        socket.to(meetingCode).emit("joined",userId);

        socket.on("chat",chatMessage=>{
            const user = getCurrentUser(socket.id);
            io.to(meetingCode).emit("sendChatMessage",chatMessage,user.username);
        })

        socket.on('disconnect', () => {
            socket.to(meetingCode).emit('leaveMeeting',userId);
            userLeave(socket.id);
        })
    }

    socket.on("joinMeeting",joinMeeting);
}

