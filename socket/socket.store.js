let sockets=[];

module.exports.addSocket = (newSocket) => {
        let isAlreadyInSocketList = false;
        for (let i = 0; i < sockets.length; i++) {
            if (sockets[i].iduser === newSocket.iduser) {
                if(sockets[i].address!=newSocket.address){
                    isAlreadyInSocketList = true;
                    break;
                }
            }
        }
        if (!isAlreadyInSocketList) {
            sockets.push(newSocket);
        }
    }
module.exports.getSockets = () => {
    return sockets;
};
module.exports.removeSocket = (socket) => {
    for (let i = 0; i < sockets.length; i++) {
        if (sockets[i].id === socket.id) {
            sockets.splice(i, 1);
            break;
        }
    }
}
module.exports.getByUser = (iduser) => {
    return new Promise((resolve, reject) => {
        console.log(sockets.length);
       let socketUser=[];
        sockets.forEach((socket) => {
           
            if (socket.iduser == iduser) {
                socketUser.push(socket);
              
            }
        });
        if(socketUser.length>0){
            resolve(socketUser);
        }else{
            reject("no user with id");
        }
        
    });

}