import { Component } from '@angular/core';
import {IonicPage, NavController } from 'ionic-angular';
import {ChatMetaData } from "../../models/message.model";
import {SelectedMessagePage} from "../selected-message/selected-message";
// import {MessagesService} from "../../services/messages.service";
// import {AuthenticationService} from "../../services/authentication.service";
// import {Subscription} from "rxjs/Subscription";
// import {Observable} from "rxjs/Observable";





@IonicPage()
@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html',
})
export class MessagesPage {

  public chats:ChatMetaData[];
  selectedMessagePage = SelectedMessagePage;
  userId:string;

  constructor(private navCtrl: NavController) {}

  ionViewWillEnter(){
    //this.userId = this.authService.getActiveUser().uid;
    //this.messagesService.chats.subscribe((metaData) =>{this.chats = metaData;});
  }

  ionViewWillUnload(){

  }

  onSelectMessage(index:number){
    this.navCtrl.push(this.selectedMessagePage, { mode:'selectedMessage', chatIndex: index, metaData: this.chats[index], sender: {username: this.chats[index].from.username, userId: this.chats[index].from.userId }});
  }

  convertTimeStampToDate(timestamp:number){
    return new Date(timestamp).toISOString();
  }
}
