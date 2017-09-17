import {Component, OnInit} from '@angular/core';
import {AlertController, App, IonicPage, NavParams} from 'ionic-angular';
import {ChatMetaData, Message} from "../../models/message.model";
import {Keyboard} from "@ionic-native/keyboard";
// import {MessagesService} from "../../services/messages.service";
import {ChatBubbleData} from "../../models/ChatBubbleData.model";
// import {AuthenticationService} from "../../services/authentication.service";
// import {ProfileService} from "../../services/profile.service";
import {Subscription} from "rxjs/Subscription";


@IonicPage()
@Component({
  selector: 'page-selected-message',
  templateUrl: 'selected-message.html',
})
export class SelectedMessagePage implements OnInit {

  chat:ChatBubbleData[];
  recipient:{username:string, userId:string};
  sender:{username:string, userId:string};
  index:number;
  mode:string;
  metaData:ChatMetaData;
  sendMessageSubscription:Subscription;
  createChatSubscription:Subscription;
  chat_id:string;

  constructor(public navParams: NavParams,
              private keyboard: Keyboard,
              // private messagesService: MessagesService,
              // private profileService: ProfileService,
              // private authService: AuthenticationService,
              private alertCtrl: AlertController,
              private appCtrl: App) {
  }

  ngOnInit() {
    this.index = this.navParams.get('chatIndex');
    // this.messagesService.chats.subscribe((metaData) =>{this.metaData = metaData[this.index];});
    this.recipient = this.navParams.get('sender');
    this.mode = this.navParams.get('mode');
    // this.sender = {username: this.profileService.getUsername(), userId: this.authService.getActiveUser().uid};
  }

  ionViewWillEnter() {

    const participants = {from: {username: this.sender.username, userId: this.sender.userId}, to: {username: this.recipient.username, userId: this.recipient.userId}};
    if(this.mode === 'selectedMessage'){
      //if user has entered page by selecting a specific chat in the messages pagbe
      //this.loadMessages(this.metaData.chat_id);
      this.chat_id = this.metaData.chat_id;
    } else if(this.mode === 'newMessage')
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
              this.mode = "selectedMessage";
              //this.chat_id = chat_id;
            // });
          }
        // });
    }


  ionViewDidLoad() {
    this.keyboard.show();
  }

  onSend(text) {
    const message = {from:{username: this.sender.username, userId: this.sender.userId}, to:{username: this.recipient.username, userId: this.recipient.userId}, message:text.value, timestamp:new Date().getTime()};
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
    if(this.sendMessageSubscription){
      this.sendMessageSubscription.unsubscribe();
    }
    if(this.createChatSubscription){
      this.createChatSubscription.unsubscribe();
    }
  }


  parseMessagesForChatBubble(messages:Message[]):ChatBubbleData[]{
    let result:ChatBubbleData[] = [];
    for(let i=0; i < messages.length; i++){
      const position = i%2 == 0? 'right': 'left';
      result.push(new ChatBubbleData(messages[i].message, position, new Date(messages[i].timestamp).toISOString(), messages[i].from.username));
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
