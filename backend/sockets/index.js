const meetingHandler = require("./meetingHandler");

const onConnection = (io) => {
    io.on("connection", (socket) => {
        meetingHandler(io, socket);
    });
};

module.exports = onConnection;