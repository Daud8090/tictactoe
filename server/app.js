const dotenv =require('dotenv')
const express =require('express')
const app = express();
var http = require('http').createServer(app);
var cors = require('cors');
app.use(cors());
var io = require('socket.io')(http, {
    cors: {
        origin: "*",
    }
});
// var cors = require('cors');
//         app.use(cors())
dotenv.config({path:'./config.env'});
require('./db/conn')
// const DB= process.env.Database;
app.use(express.json())
app.use(require('./routes/auth'));

const PORT= process.env.PORT;
var arr=[];


io.on('connection',(socket)=>{
    console.log('user online');

    // make the user jjoin room
    socket.on('joinRoom',(obj)=>{
        // i++;
        arr.push(obj);
        console.log(obj.room ,"    <<<<==============>");
        socket.join(obj.room);
        
    })
    socket.on('message', data => {
        // console.log("your data : ", data.squares)
        console.log("your data : ", data.X," ",data.Y)
        if (data.turn === 'X') {
            data.turn='O'
        }
        else {
            data.turn='X'
        }
       
        io.to(data.room).emit('message', data)
    })





    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
})












http.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})