const socketStore = require('./socket.store.js');
let chat = []   //contient des objects { id : xx , messages : [] }
const moment = require('moment-timezone');

const usernames = []
module.exports = (io) => {
    io.on('connection', function (socket) {

        console.log('\n connection someone connect', socket.id);
        socket.on('user_connected', function () {
         console.log("aziz")
        })

        socket.on('first', (messages, idchat) => {
            let x = 0
            for (var i = 0; i < chat.length; i++) {
                if (chat[i].id == idchat) {
                    x = 1
                    break
                }
            }

            if (x == 0) {
                let newchat = {
                    id: idchat,
                    messages: messages
                }
               chat.push(newchat)
            }

            console.log("chat",chat)
        });

        socket.on('msg', (username, message, id) => {

            objmessage = {}
            for (var i = 0; i < chat.length; i++) {
                if (chat[i].id == id) {
                    objmessage.sender = username
                    objmessage.contenu = message
                    chat[i].messages.push(objmessage)

                    break
                }
            }
            //     io.emit('msg', {message,id})
            io.emit('get', chat)


        });

        socket.on('disconnect', () => {
            console.log('someone disconnect');
            socketStore.removeSocket(socket);
        });
    });
    io.on('disconnect', function () {

    });
}