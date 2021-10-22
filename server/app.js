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
dotenv.config({path:'./config.env'});
require('./db/conn')
app.use(express.json())
app.use(require('./routes/auth'));
const { addgame,getGame,list,delgame}=require('./gamelist');
const PORT= process.env.PORT;
var arr=[];


io.on('connection',(socket)=>{
    console.log('user online');

    // make the user jjoin room
    socket.on('joinRoom',(obj)=>{
        // i++;
        let len=getGame(obj.room)
        if(len<2)
        {
            addgame(obj);
            socket.join(obj.room);

        }
        else
        socket.emit('joinRoom',{message:"waiting",status:404})
        // console.log(socket.server.engine.clientsCount);
        
        
    })
    socket.on('message', data => {
        // console.log("your data : ", data.squares)
        // console.log("your data : ", data.X," ",data.Y)
        // console.log(data.winner ,"    <<<<==============>");
        if (data.turn === 'X') {
            data.turn='O'
        }
        else {
            data.turn='X'
        }
       
        io.to(data.room).emit('message', data)
    })





    socket.on('disconnect', () => {
        // console.log(socket.id,"   in dis ")
        delgame(socket.id)
        console.log('user disconnected');
    });
})



app.get("/list",(req,res)=>{
    res.send(list())
})








http.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})