import { APP_MESSAGE } from '../constants/ActionTypes';

export function newMessage(msg) {

  console.log("seen message");
  console.log(msg);
  
  const {id, name, view, data} = msg;
 
  return {
    type: APP_MESSAGE,
    id,
    name,
    view,
    data
  }
}