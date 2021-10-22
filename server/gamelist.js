let gamelist = [];
const addgame = ( game ) => {
    if(game.id)
    gamelist.push(game);
    // console.log(gamelist)
    // return game ;
}
function getGame(checkroom) { 
    // console.log(gamelist, checkroom)
   const newarray= gamelist.filter((game) => game.room == checkroom);
    return newarray.length;
}
function delgame(id) { 
    // console.log(users,id)
    let b=gamelist.filter(ele => ele.id!==id)
    gamelist=b;
 
}
function list() { 
    let newArray = [];
    let uniqueObject = {};
    for (let i in gamelist) {
        objTitle = gamelist[i]['room'];
        uniqueObject[objTitle] = gamelist[i];
    }
    for (i in uniqueObject) {
        newArray.push(uniqueObject[i]);
    }
    console.log(newArray," <-----")

 return newArray;
}

// const getUsersInRoom = (Room) => users.filter((user) => user.Room === Room);
module.exports = { addgame, getGame ,list,delgame}