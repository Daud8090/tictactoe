const mongoose = require('mongoose');


const DB= process.env.Database;

mongoose.connect(DB).then(()=>{
console.log("sucessfull connection");
})
.catch((err)=> console.log("err in connection"));
