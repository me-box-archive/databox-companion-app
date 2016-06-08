import io from 'socket.io-client';
import {newMessage} from '../actions/WebSocketActions';

export default function init(namespace, appId, dispatch) {
  
  const socket = io('/'+namespace);
 
  console.log("in the inoit function!");
 
  socket.on("connect", function(){
      socket.emit("join", appId);
  });

  socket.on("message", function(data){
    console.log("got some data!");
    console.log(data);
    dispatch(newMessage(data));
  });

};
   