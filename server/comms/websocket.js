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
              console.log(`hurrah -- seen ${app}`);
              socket.join(app);
             /*username = u;*/
             /*db.fetch_groups_for_user(username).then(function(results){
                var user = results.reduce(function(acc, obj){
                  return obj
                },{})

                 user.groups.forEach(function(group){
                    socket.join(group);
                 });
                
                connected[username] = connected[username] || {connected: 0, user:user.user};
                connected[username].connected += 1;

             })
             */

              //sendmessage(app, "databox", "test", "ehllo!");
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
