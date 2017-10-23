import {Component, OnInit} from '@angular/core';
import {AlertController, App, IonicPage, NavParams} from 'ionic-angular';
import {Chat, Message} from "../../models/message.model";
import {Keyboard} from "@ionic-native/keyboard";
import {ChatBubbleData} from "../../models/ChatBubbleData.model";
import {Subscription} from "rxjs/Subscription";
import {AuthenticationService} from "../../services/authentication.service";
import {ProfileService} from "../../services/profile.service";
import {MessagesService} from "../../services/messages.service";


@IonicPage()
@Component({
  selector: 'page-selected-message',
  templateUrl: 'selected-message.html',
})
export class SelectedMessagePage implements OnInit {

  chat:ChatBubbleData[];
  messages:Message[] = [];
  messageSubscription:Subscription;
  recipient:{username:string, _id:string};
  sender:{username:string, _id:string};
  index:number;
  mode:string;
  metaData:Chat;
  chat_id:string;
  messages_id:string;

  constructor(public navParams: NavParams,
              private keyboard: Keyboard,
              private msgService: MessagesService,
              private profileService: ProfileService,
              private authService: AuthenticationService,
              private alertCtrl: AlertController,
              private appCtrl: App) {
  }

  ngOnInit() {
    this.recipient = this.navParams.get('recipient');
    this.sender = {username: this.profileService.getProfile().username, _id: this.authService.getUser()._id};
    this.mode = this.navParams.get('mode');
    // this.messageSubscription = this.msgService.messageListener$
    //   .subscribe((message: Message) => {
    //     if(message){
    //       this.messages.push(message);
    //     }
    //   });
    if (this.mode === 'newChat') {

    }


  }

  ionViewWillEnter() {

    console.log(this.mode);
    if (this.mode === 'selectedMessasge') {

    } else if (this.mode === 'newChat') {
      console.log(`${this.authService.getUser()._id} requesting new chat with ${this.recipient._id}`);
      this.msgService.createChat(this.recipient._id,
        (chat_id: string) => {
          console.log(chat_id);
          this.chat_id = chat_id;
          this.msgService.joinChat(chat_id,
            (chat_id) => {
              console.log(`successfully joined chat: ${chat_id}`);
              this.mode = 'selectedMessage';
          });
        }
      );
    }

    // const participants = {from: {username: this.sender.username, userId: this.sender.userId}, to: {username: this.recipient.username, userId: this.recipient.userId}};
    if(this.mode === 'selectedMessage'){
      //if user has entered page by selecting a specific chat in the messages page
      //this.loadMessages(this.metaData.chat_id);
      // this.chat_id = this.metaData._id;
    } else if(this.mode === 'newChat')
    {


      //if user has entered page from a pigeon, then checks for pre-existing chats -- if none exist, then one is created.
      // this.messagesService.chatMetaDataExistsFor(participants)
      //   .then((exists:boolean)=>{
      //   console.log('got here');
      //     if(!exists){
      //       this.chat_id = this.sender.userId.concat(this.recipient.userId);
      //       console.log('created chat_id', this.chat_id);
      //       const chatMetaData = {chat_id: this.chat_id, from:{username: this.sender.username, userId: this.sender.userId}, to:{username: this.recipient.username, userId: this.recipient.userId}, lastMessage:"", timestamp: new Date().getTime()};
      //       this.metaData = chatMetaData;
      //       this.authService.getActiveUser().getIdToken().then((token) => {
      //         this.createChatSubscription = this.messagesService.createChatMetaData(token, chatMetaData)
      //           .subscribe(
      //             () => { this.chat = [];},
      //             (error) => {
      //               console.log(error);
      //               const alert = this.alertCtrl.create({ title: 'Error Occured', message: 'Unable to create chat at this time.  Please check your internet connection.'});
      //               alert.present();
      //             });
      //         },
      //         (error:Error) => {
      //           console.log(error);
      //         });
          } else {
            //if user selects a pigeon that belongs to a user with whom they have an active conversation with, then finds that chat_id and loads that conversation.
            //this.messagesService.findChatId(participants).then((chat_id)=>{
              //this.loadMessages(chat_id);
              //this.mode = "selectedMessage";
              //this.chat_id = chat_id;
            // });
          }
        // });


  }


  ionViewDidLoad() {
    this.keyboard.show();
  }

  onSend(text) {
    const message = new Message(this.sender._id, this.recipient._id, text.value);
    console.log(message);
    if(text.value !== "") {
      this.msgService.sendMessage(message, this.chat_id, (status: string) => {
        console.log(status)
      });
    }
    text.value = "";
    //this.authService.getActiveUser().getIdToken().then((token) => {
    //   this.sendMessageSubscription = this.messagesService.sendMessage(token, message, this.chat_id)
    //     .subscribe(
    //       ()=>{},
    //       (error)=>{
    //         console.log(error);
    //         const alert = this.alertCtrl.create({ title: 'Error Occured', message: 'Unable to send message at this time.  Please check your internet connection.'});
    //         alert.present();
    //       });
    // });
  }

  ionViewWillUnload(){

  }

  parseMessagesForChatBubble(messages:Message[]):ChatBubbleData[]{
    let result:ChatBubbleData[] = [];
    for(let i=0; i < messages.length; i++){
      const sender = messages[i].from === this.sender._id? this.sender.username : this.recipient.username;
      const position = sender === this.sender.username? 'right': 'left';
      result.push(new ChatBubbleData(messages[i].message, position, new Date(messages[i].timestamp).toISOString(), sender));
    }
    return result;
  }

  // loadMessages(chat_id:string){
  //   this.messagesService.getMessages(chat_id)
  //     .on('value', (data) =>{
  //       console.log(chat_id);
  //       if(!data){
  //         this.chat = [];
  //       } else {
  //         let messages = [];
  //         let keys = Object.keys(data.val());
  //         console.log(keys);
  //         for(let key of keys){
  //           let id = data.val()[key];
  //           messages.push(id);
  //         }
  //         this.chat = this.parseMessagesForChatBubble(messages);
  //       }
  //     });
  //   if(!this.metaData){
  //     const chats = this.appCtrl.getRootNav().chats;
  //     for(let chat of chats){
  //       if(chat.chat_id == chat_id){
  //         this.metaData = chat;
  //         break;
  //       }
  //     }
  //   }
  // }

}
