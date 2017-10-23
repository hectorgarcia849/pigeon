
import {Injectable} from "@angular/core";
import {Chat, Message} from "../models/message.model";
import 'rxjs/Rx';
import * as io from 'socket.io-client';
import {Socket} from 'socket.io-client';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";
import {User} from "../models/user.model";
import {ReplaySubject} from "rxjs/ReplaySubject";
import {Http, Response} from "@angular/http";

@Injectable()

export class MessagesService {

  allMessages: Message[][];
  messages: Message[] = [];
  chats: Chat[] = [];
  socketConnected$ = new BehaviorSubject<boolean>(false);
  messageHandler$ = new ReplaySubject<Message>(1);
  messageListener$: Observable<Message> = this.messageHandler$.asObservable();
  socketStatus$: Observable<boolean> = this.socketConnected$.asObservable();
  private socket: Socket;
  private urlSOCKET = 'http://localhost:4000'; //https://pacific-river-87352.herokuapp.com
  private urlREST = 'http://localhost:3000';

  constructor(private http: Http) {}

  connect(token: string) {
    console.log('connect');
    this.socket = io(`${this.urlSOCKET}/?token=${token}`);
    this.socket.on('connection', () => {console.log('socket connected'); this.socketConnected$.next(true);});
    this.socket.on('createChatId', (withUser) => {console.log(`created chat with ${withUser}`)});
    this.socket.on('joinChatById', (chat_id: string) => {});
    this.socket.on('leaveChat', (chat_id: string) => {});
    this.socket.on('disconnection', () => {console.log('socket disconnected'); this.socketConnected$.next(false);});
    this.socket.on('message', (message:Message) => {console.log('message returned from server'); this.messageHandler$.next(message);});
  }

  createChatProfileForUserOnServer(token: string, user_id: string) {
    console.log('msgService request to create Chats for', user_id, token);
    return this.http.post(`${this.urlREST}/chats/profile?token=${token}`, user_id)
      .map((response: Response) => {
        console.log('created', response.json());
      })
      .catch((error: Response) => Observable.throw(error)
      );
  }

  getChatProfileForUserOnServer(token: string){
    console.log('msgService request to get Chats');
    return this.http.get(`${this.urlREST}/chats/profile?token=${token}`)
      .map((response: Response) => {
        console.log('get', response.json());
      })
      .catch((error: Response) =>
        Observable.throw(error)
      );
  }

  updateChatsForUserOnserver(){}

  getChats() {

  }


  createChat(addUser: string, callback:(chat_id: string) => void){
    /* Creates new room and joins the user.  A chat room is created with the
    first message to a user with which there are no open conversations with. */
    console.log('msgService emits createChat request with user ', addUser);
    this.socket.emit('createChatId', addUser, callback);
  }

  joinChat(chat_id: string, callback:(chat_id: string) => void) {
    console.log(`User joins chat: ${chat_id}`);
    this.socket.emit('joinChatById', chat_id, callback);
  }

  sendMessage(message: Message, chat_id: string, callback:(status: string) => void){
    const body = {message, chat_id};
    console.log(body);
    this.socket.emit('message', body, callback);
  }

  deleteChatRoom(id:string){
    this.socket.leave(id);
  }

  // listen(event:string): Observable<any> {
  //   return new Observable(observer => {
  //     this.socket.on(event, data => {
  //       observer.next(data);
  //       console.log('message back', data);
  //     });
  //     return () => {
  //       this.socket.off(event);
  //     }
  //   });
  // }

}

