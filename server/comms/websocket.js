import socket from 'socket.io';
let _namespaces = {};
let connected = {};


export default function init(nsps, server){

    const io = socket.listen(server);
  

    nsps.forEach(function(namespace){
      var nsp = io.of('/'+namespace);

      if (!_namespaces[namespace]){

        _namespaces[namespace] = nsp;

        nsp.on('connection', function(socket){

          socket.on('join', function(app){
              socket.join(app);
              return app; 
          });

          socket.on('disconnect', function(){


          });

        });
      }
    });
}

export function sendmessages(rooms, namespace, event, message){
  rooms.forEach(function(room){
      this.sendmessage(room,namespace,event,message);
  }.bind(this));
  return rooms.length;
};

export function sendmessage(room, namespace, event, message){
      if (_namespaces[namespace]){
        _namespaces[namespace].to(room).emit(event, message);
      }
};
