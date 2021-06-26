const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

const { ExpressPeerServer } = require('peer');
const peerServer = ExpressPeerServer(server,{
    debug: true
})

app.use(express.urlencoded({extended:true}));

app.set('view engine', 'ejs')
app.set('views', "./frontend/views")

app.use(express.static("frontend/public"));
app.use("/peerjs",peerServer);

app.use("/", require("./backend/routes/routes"));

require("./backend/sockets/index")(io);

const PORT = process.env.PORT || 8000;
server.listen(PORT,()=>{
    console.log(`Express server is running on port ${PORT}`);
});