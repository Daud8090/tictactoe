const gamelist = [];
const addgame = ( id, Name, Room ) => {
    // console.log("abababbabbabab")
    // console.log(id,Name,Room)
    const game = { id, Name, Room }
    gamelist.push(game);
    return game ;
}
function getGame(id) { 
    // console.log(users,id)
 return gamelist.find((game) => game.id === id);
}


// const getUsersInRoom = (Room) => users.filter((user) => user.Room === Room);
module.exports = { addgame, getGame }