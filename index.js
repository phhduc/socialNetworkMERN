//define
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const SocketServer = require('./socketServer')



//middleware
const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());


//socket server
const http = require('http').Server(app);
const io = require('socket.io')(http);
io.on('connection', socket => SocketServer(socket));


//database
const URI = process.env.DB_URL;
const port = process.env.PORT || 8080;
mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    }
    , err => {
        if(err) throw err;
        console.log("connected to db");
    });
//routes
app.use('/api', require("./routes/authRouter"));
app.use('/api', require("./routes/userRouter"));
app.use('/api', require("./routes/postRouter"));
app.use('/api', require("./routes/commentRouter"));
app.use('/api', require("./routes/notifyRouter"));
app.use('/api', require("./routes/messageRouter"));

http.listen(port, () => {
    console.log(`Server started on port ${port}`);
});