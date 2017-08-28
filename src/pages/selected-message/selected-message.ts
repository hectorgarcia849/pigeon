import {Component, OnInit} from '@angular/core';
import {IonicPage, NavParams} from 'ionic-angular';
import {Message} from "../../models/message.model";
import {Keyboard} from "@ionic-native/keyboard";
import {MessagesService} from "../../services/messages.service";
import {ChatBubbleData} from "../../models/ChatBubbleData.model";


@IonicPage()
@Component({
  selector: 'page-selected-message',
  templateUrl: 'selected-message.html',
})
export class SelectedMessagePage implements OnInit {

  messagesFrom:ChatBubbleData[];
  sender:string;
  index:number;
  mode:string;

  constructor(public navParams: NavParams, private keyboard: Keyboard, private messagesService: MessagesService) {
  }

  ngOnInit() {
    this.index = this.navParams.get('messagesFrom');
    this.sender = this.navParams.get('sender');
    this.mode = this.navParams.get('mode');
  }

  ionViewWillEnter() {

    if(this.mode === 'selectedMessage'){
      this.messagesFrom = this.parseMessagesForChatBubble(this.messagesService.getMessages(this.index));
      console.log(this.messagesFrom);
    } else {
      this.messagesFrom = [];
    }
  }

  ionViewDidLoad() {
    this.keyboard.show();
  }

  sendMessage() {

  }


  parseMessagesForChatBubble(messages:Message[]):ChatBubbleData[]{

    let result:ChatBubbleData[] = [];
    for(let i=0; i < messages.length; i++){
      const position = i%2 == 0? 'right': 'left';
      result.push(new ChatBubbleData(messages[i].message, position, new Date(messages[i].timestamp).toISOString(), messages[i].from.username));
    }
    return result;
  }
}
