const moment = require('moment');
const {
    userJoin,
    getCurrentUser,
    userLeave,
    getParticipants,
  } = require('../utils/users');

module.exports = (io,socket) => {

    const joinMeeting = (meetingCode, userId,username) => {
        socket.join(meetingCode);
        userJoin(socket.id,username,meetingCode);
        io.to(meetingCode).emit("getParticipants",meetingCode,getParticipants(meetingCode));

        
        socket.to(meetingCode).emit("joined",userId);

        socket.on("chat",chatMessage=>{
            const user = getCurrentUser(socket.id);
            io.to(meetingCode).emit("sendChatMessage",chatMessage,user.username,moment().format('h:mm A'));
        })

        socket.on('disconnect', () => {
            socket.to(meetingCode).emit('leaveMeeting',userId);
            userLeave(socket.id);
            io.to(meetingCode).emit("getParticipants",meetingCode,getParticipants(meetingCode));
        })
    }

    socket.on("joinMeeting",joinMeeting);
}

