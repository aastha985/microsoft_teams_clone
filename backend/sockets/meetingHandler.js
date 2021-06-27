module.exports = (io,socket) => {

    const joinMeeting = (meetingCode, username) => {
        socket.join(meetingCode);
        socket.to(meetingCode).emit("joined",username);

        socket.on("chat",chatMessage=>{
            io.to(meetingCode).emit("sendChatMessage",chatMessage);
        })

        socket.on('disconnect', () => {
            socket.to(meetingCode).emit('leaveMeeting', username)
        })
    }

    socket.on("joinMeeting",joinMeeting);
}

