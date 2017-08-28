import {Component } from '@angular/core';
import {IonicPage, NavController } from 'ionic-angular';
import {ChatMetaData } from "../../models/message.model";
import {SelectedMessagePage} from "../selected-message/selected-message";
import {MessagesService} from "../../services/messages.service";

@IonicPage()
@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html',
})
export class MessagesPage {

  chats:ChatMetaData[]=[];
  selectedMessagePage = SelectedMessagePage;

  constructor(private navCtrl: NavController, private messagesService: MessagesService ) {}

  ionViewWillEnter(){
    this.chats = this.messagesService.getChats();
  }

  onSelectMessage(index:number){
    this.navCtrl.push(this.selectedMessagePage, {mode:'selectedMessage', messagesFrom: index, sender: this.chats[index].from.username});
  }

  convertTimeStampToDate(timestamp:number){
    return new Date(timestamp).toISOString();
  }

}
