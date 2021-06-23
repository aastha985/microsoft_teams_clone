const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

const { ExpressPeerServer } = require('peer');
const peerServer = ExpressPeerServer(server,{
    debug: true
})

app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static("public"));
app.use("/peerjs",peerServer);

app.use("/", require("./routes/index"));

require("./sockets/index")(io);

const PORT = process.env.PORT || 8000;
server.listen(PORT,()=>{
    console.log(`Express server is running on port ${PORT}`);
});