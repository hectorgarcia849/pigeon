
import {Injectable} from "@angular/core";
import {ChatMetaData, Message} from "../models/message.model";
import 'rxjs/Rx';
import * as io from 'socket.io-client';
import {Socket} from 'socket.io-client';




@Injectable()

export class MessagesService {

  allMessages: Message[][];
  messages: Message[] = [];
  chatMetaData: ChatMetaData[] = [];
  private socket: Socket;
  private url = 'http://localhost:3000'; //https://pacific-river-87352.herokuapp.com

  constructor() {
    // this.messages = [{from: {username: 'Hector Garcia', userId: 'asodfoisjaf'}, to:{username: 'friend', userId: '12n3ef9dsn'}, message: 'This is a long time coming; lameness does not suit you buddy -- you need to man up dude', timestamp: new Date(2017,6,20,0,0).getTime()}, {from: {username: 'Hector Garcia', userId: 'asodfoisjaf'}, to:{username: 'friend', userId: '12n3ef9dsn'}, message: 'This is a long time coming; lameness does not suit you buddy -- you need to man up dude', timestamp: new Date(2017,6,20,0,0).getTime()}, {from: {username: 'Hector Garcia', userId: 'asodfoisjaf'}, to:{username: 'friend', userId: '12n3ef9dsn'}, message: 'This is a long time coming; lameness does not suit you buddy -- you need to man up dude', timestamp: new Date(2017,6,20,0,0).getTime()}, {from: {username: 'Hector Garcia', userId: 'asodfoisjaf'}, to:{username: 'friend', userId: '12n3ef9dsn'}, message: 'This is a long time coming; lameness does not suit you buddy -- you need to man up dude', timestamp: new Date(2017,6,20,0,0).getTime()}, {from: {username: 'Hector Garcia', userId: 'asodfoisjaf'}, to:{username: 'friend', userId: '12n3ef9dsn'}, message: 'This is a long time coming; lameness does not suit you buddy -- you need to man up dude', timestamp: new Date(2017,6,20,0,0).getTime()}], [{from: {username: 'Hector Garcia', userId: 'asodfoisjaf'}, to:{username: 'friend', userId: '12n3ef9dsn'}, message: 'This is a long time coming; lameness does not suit you buddy -- you need to man up dude', timestamp: new Date(2017,6,20,0,0).getTime()}, {from: {username: 'Hector Garcia', userId: 'asodfoisjaf'}, to:{username: 'friend', userId: '12n3ef9dsn'}, message: 'This is a long time coming; lameness does not suit you buddy -- you need to man up dude', timestamp: new Date(2017,6,20,0,0).getTime()}, {from: {username: 'Hector Garcia', userId: 'asodfoisjaf'}, to:{username: 'friend', userId: '12n3ef9dsn'}, message: 'This is a long time coming; lameness does not suit you buddy -- you need to man up dude', timestamp: new Date(2017,6,20,0,0).getTime()}, {from: {username: 'Hector Garcia', userId: 'asodfoisjaf'}, to:{username: 'friend', userId: '12n3ef9dsn'}, message: 'This is a long time coming; lameness does not suit you buddy -- you need to man up dude', timestamp: new Date(2017,6,20,0,0).getTime()}, {from: {username: 'Hector Garcia', userId: 'asodfoisjaf'}, to:{username: 'friend', userId: '12n3ef9dsn'}, message: 'This is a long time coming; lameness does not suit you buddy -- you need to man up dude', timestamp: new Date(2017,6,20,0,0).getTime()}];
    // this.allMessages = [[{from: {username: 'Hector Garcia', userId: 'asodfoisjaf'}, to:{username: 'friend', userId: '12n3ef9dsn'}, message: 'messagegroup1, this is the first message of many, crazyyyyy huh!  Wow look at how this chatbubble exapnds', timestamp: new Date(2017,6,20,0,0).getTime()}, {from: {username: 'Hector Garcia', userId: 'asodfoisjaf'}, to:{username: 'friend', userId: '12n3ef9dsn'}, message: 'messagegroup1', timestamp: new Date(2017,6,20,0,0).getTime()}, {from: {username: 'Hector Garcia', userId: 'asodfoisjaf'}, to:{username: 'friend', userId: '12n3ef9dsn'}, message: 'messagegroup1', timestamp: new Date(2017,6,20,0,0).getTime()}, {from: {username: 'Hector Garcia', userId: 'asodfoisjaf'}, to:{username: 'friend', userId: '12n3ef9dsn'}, message: 'messagegroup1', timestamp: new Date(2017,6,20,0,0).getTime()}, {from: {username: 'Hector Garcia', userId: 'asodfoisjaf'}, to:{username: 'friend', userId: '12n3ef9dsn'}, message: 'messagegroup1', timestamp: new Date(2017,6,20,0,0).getTime()}], [{from: {username: 'Hector Garcia', userId: 'asodfoisjaf'}, to:{username: 'friend', userId: '12n3ef9dsn'}, message: 'messagegroup2', timestamp: new Date(2017,6,20,0,0).getTime()}, {from: {username: 'Hector Garcia', userId: 'asodfoisjaf'}, to:{username: 'friend', userId: '12n3ef9dsn'}, message: 'messagegroup2', timestamp: new Date(2017,6,20,0,0).getTime()}, {from: {username: 'Hector Garcia', userId: 'asodfoisjaf'}, to:{username: 'friend', userId: '12n3ef9dsn'}, message: 'messagegroup2', timestamp: new Date(2017,6,20,0,0).getTime()}, {from: {username: 'Hector Garcia', userId: 'asodfoisjaf'}, to:{username: 'friend', userId: '12n3ef9dsn'}, message: 'This is a long time coming; lameness does not suit you buddy -- you need to man up dude', timestamp: new Date(2017,6,20,0,0).getTime()}, {from: {username: 'Hector Garcia', userId: 'asodfoisjaf'}, to:{username: 'friend', userId: '12n3ef9dsn'}, message: 'This is a long time coming; lameness does not suit you buddy -- you need to man up dude', timestamp: new Date(2017,6,20,0,0).getTime()}], [{from: {username: 'Hector Garcia', userId: 'asodfoisjaf'}, to:{username: 'friend', userId: '12n3ef9dsn'}, message: 'messagegroup3', timestamp: new Date(2017,6,20,0,0).getTime()}, {from: {username: 'Hector Garcia', userId: 'asodfoisjaf'}, to:{username: 'friend', userId: '12n3ef9dsn'}, message: 'This is a long time coming; lameness does not suit you buddy -- you need to man up dude', timestamp: new Date(2017,6,20,0,0).getTime()}, {from: {username: 'Hector Garcia', userId: 'asodfoisjaf'}, to:{username: 'friend', userId: '12n3ef9dsn'}, message: 'This is a long time coming; lameness does not suit you buddy -- you need to man up dude', timestamp: new Date(2017,6,20,0,0).getTime()}, {from: {username: 'Hector Garcia', userId: 'asodfoisjaf'}, to:{username: 'friend', userId: '12n3ef9dsn'}, message: 'This is a long time coming; lameness does not suit you buddy -- you need to man up dude', timestamp: new Date(2017,6,20,0,0).getTime()}, {from: {username: 'Hector Garcia', userId: 'asodfoisjaf'}, to:{username: 'friend', userId: '12n3ef9dsn'}, message: 'This is a long time coming; lameness does not suit you buddy -- you need to man up dude', timestamp: new Date(2017,6,20,0,0).getTime()}], [{from: {username: 'Hector Garcia', userId: 'asodfoisjaf'}, to:{username: 'friend', userId: '12n3ef9dsn'}, message: 'This is a long time coming; lameness does not suit you buddy -- you need to man up dude', timestamp: new Date(2017,6,20,0,0).getTime()}, {from: {username: 'Hector Garcia', userId: 'asodfoisjaf'}, to:{username: 'friend', userId: '12n3ef9dsn'}, message: 'This is a long time coming; lameness does not suit you buddy -- you need to man up dude', timestamp: new Date(2017,6,20,0,0).getTime()}, {from: {username: 'Hector Garcia', userId: 'asodfoisjaf'}, to:{username: 'friend', userId: '12n3ef9dsn'}, message: 'This is a long time coming; lameness does not suit you buddy -- you need to man up dude', timestamp: new Date(2017,6,20,0,0).getTime()}, {from: {username: 'Hector Garcia', userId: 'asodfoisjaf'}, to:{username: 'friend', userId: '12n3ef9dsn'}, message: 'This is a long time coming; lameness does not suit you buddy -- you need to man up dude', timestamp: new Date(2017,6,20,0,0).getTime()}, {from: {username: 'Hector Garcia', userId: 'asodfoisjaf'}, to:{username: 'friend', userId: '12n3ef9dsn'}, message: 'This is a long time coming; lameness does not suit you buddy -- you need to man up dude', timestamp: new Date(2017,6,20,0,0).getTime()}], [{from: {username: 'Hector Garcia', userId: 'asodfoisjaf'}, to:{username: 'friend', userId: '12n3ef9dsn'}, message: 'This is a long time coming; lameness does not suit you buddy -- you need to man up dude', timestamp: new Date(2017,6,20,0,0).getTime()}, {from: {username: 'Hector Garcia', userId: 'asodfoisjaf'}, to:{username: 'friend', userId: '12n3ef9dsn'}, message: 'This is a long time coming; lameness does not suit you buddy -- you need to man up dude', timestamp: new Date(2017,6,20,0,0).getTime()}, {from: {username: 'Hector Garcia', userId: 'asodfoisjaf'}, to:{username: 'friend', userId: '12n3ef9dsn'}, message: 'This is a long time coming; lameness does not suit you buddy -- you need to man up dude', timestamp: new Date(2017,6,20,0,0).getTime()}, {from: {username: 'Hector Garcia', userId: 'asodfoisjaf'}, to:{username: 'friend', userId: '12n3ef9dsn'}, message: 'This is a long time coming; lameness does not suit you buddy -- you need to man up dude', timestamp: new Date(2017,6,20,0,0).getTime()}, {from: {username: 'Hector Garcia', userId: 'asodfoisjaf'}, to:{username: 'friend', userId: '12n3ef9dsn'}, message: 'This is a long time coming; lameness does not suit you buddy -- you need to man up dude', timestamp: new Date(2017,6,20,0,0).getTime()}], [{from: {username: 'Hector Garcia', userId: 'asodfoisjaf'}, to:{username: 'friend', userId: '12n3ef9dsn'}, message: 'This is a long time coming; lameness does not suit you buddy -- you need to man up dude', timestamp: new Date(2017,6,20,0,0).getTime()}, {from: {username: 'Hector Garcia', userId: 'asodfoisjaf'}, to:{username: 'friend', userId: '12n3ef9dsn'}, message: 'This is a long time coming; lameness does not suit you buddy -- you need to man up dude', timestamp: new Date(2017,6,20,0,0).getTime()}, {from: {username: 'Hector Garcia', userId: 'asodfoisjaf'}, to:{username: 'friend', userId: '12n3ef9dsn'}, message: 'This is a long time coming; lameness does not suit you buddy -- you need to man up dude', timestamp: new Date(2017,6,20,0,0).getTime()}, {from: {username: 'Hector Garcia', userId: 'asodfoisjaf'}, to:{username: 'friend', userId: '12n3ef9dsn'}, message: 'This is a long time coming; lameness does not suit you buddy -- you need to man up dude', timestamp: new Date(2017,6,20,0,0).getTime()}, {from: {username: 'Hector Garcia', userId: 'asodfoisjaf'}, to:{username: 'friend', userId: '12n3ef9dsn'}, message: 'This is a long time coming; lameness does not suit you buddy -- you need to man up dude', timestamp: new Date(2017,6,20,0,0).getTime()}]];
    // //this.chats = [{from: {username: 'Hector Garcia', userId: 'asodfoisjaf'}, lastMessage:'Hear the latest on Kyrie???', timestamp: new Date(2017,6,20,0,0).getTime()}, {from: {username: 'Hector Garcia', userId: 'asodfoisjaf'}, lastMessage:'Hear the latest on Kyrie???', timestamp: new Date().getTime()}, {from: {username: 'Hector Garcia', userId: 'asodfoisjaf'}, lastMessage:'Hear the latest on Kyrie???', timestamp: new Date().getTime()}];
    // const userId = this.authService.getActiveUser().uid;
    // this.getChatMetaDataFromDB(userId).then((metaData)=>{this._chats.next(metaData)});
  }

  connect(token): Socket{
    this.socket = io(`${this.url}?token=${token}`);
    return this.socket;
  }

  sendMessage(message:Message){
    this.socket.emit('message', message);
  }

  createChatRoom(id:string){
    this.socket.join(id);
  }

  deleteChatRoom(id:string){
    this.socket.leave(id);
  }
}



//   getMessages(chat_id:string){
//     return firebase.database().ref('/chats/'+ chat_id + '/messages');
//   }
//
//   getLastMessage(token:string, chat_id:string){
//     return this.http.get('https://pigeon-e922b.firebaseio.com/chats/' + chat_id + '/messages.json?auth=' + token)
//       .map((response:Response) => {console.log(response.json()); return response.json();});
//   }
//
//
//
//   createChatMetaData(token:string, chatMetaData:ChatMetaData){
//     return this.http.put('https://pigeon-e922b.firebaseio.com/chats/'+ chatMetaData.chat_id +'/chatmetadata.json?auth=' + token, chatMetaData)
//         .map((response:Response) => {return response.json();});
//     //parallel calls, use forkjoin
//     //dependent sequential calls, use flatmap
//   }
//
//   private getChatMetaDataFromDB(userId:string): Promise<ChatMetaData[]> {
//     return new Promise((resolve, reject) => {
//       firebase.database().ref('/chats/')
//         .on('value', (chatMetaData) => {
//           console.log(chatMetaData.val());
//           if(!chatMetaData.val()){
//             reject(chatMetaData.val());
//           } else {
//             resolve(chatMetaData.val());
//           }
//         });
//     });
//   }
//
//   chatMetaDataExistsFor(participants:{from:{userId:string, username:string}, to:{userId:string, username:string}}): Promise<boolean> {
//
//     const chat_id1 = participants.from.userId.concat(participants.to.userId);
//     const chat_id2 = participants.to.userId.concat(participants.from.userId);
//     let metaDataExists = false;
//
//     return new Promise((resolve) =>{
//
//       firebase.database().ref('/chats/')
//         .on('value', (chatMetaData) =>{
//           let result = [];
//           console.log(chatMetaData.val());
//           if(!chatMetaData.val()){
//             metaDataExists = false;
//           }
//           else {
//             const keys = Object.keys(chatMetaData.val());
//             console.log(keys);
//             console.log(chatMetaData.val());
//             for(let key of keys){
//               let id = chatMetaData.val()[key];
//               result.push(id);
//             }
//             console.log(result);
//             if(result.indexOf(chat_id1) == -1 && result.indexOf(chat_id2) == -1){
//               metaDataExists = false;
//             } else {
//               metaDataExists = true;
//             }
//           }
//           resolve(metaDataExists);
//         });
//     });
//   }
//
//   findChatId(participants:{from:{userId:string, username:string}, to:{userId:string, username:string}}): Promise<string> {
//     const chat_id1 = participants.from.userId.concat(participants.to.userId);
//     const chat_id2 = participants.to.userId.concat(participants.from.userId);
//
//     return new Promise((resolve) =>{
//       let chat_id;
//       firebase.database().ref('/users/' + participants.from.userId + '/chatmetadata')
//         .on('value', (chatMetaData) =>{
//           let result = [];
//           if(!chatMetaData.val()){
//             resolve(chat_id);
//           }
//           else {
//             const keys = Object.keys(chatMetaData.val());
//             for(let key of keys){
//               let id = chatMetaData.val()[key].chat_id;
//               result.push(id);
//             }
//             if(result.indexOf(chat_id1) != -1){
//               resolve(chat_id1);
//             } else if(result.indexOf(chat_id2) != -1){
//               resolve(chat_id2);
//             } else {
//               resolve(chat_id);
//             }
//           }
//         });
//     });
//
//   }
//
//   sendMessage(token:string, message:Message, chat_id:string){
//     console.log(chat_id);
//     return this.http.post('https://pigeon-e922b.firebaseio.com/chats/' + chat_id + '/messages.json?auth=' + token, message)
//       .map((response: Response) => {return response.json();});
//   }
//
//   deleteMessages(){}
//
//   deleteMessage(){}
//
// }
