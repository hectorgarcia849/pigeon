import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Message} from "../../models/message.model";
import {SelectedMessagePage} from "../selected-message/selected-message";
import {CreateMessagePage} from "../create-message/create-message";

@IonicPage()
@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html',
})
export class MessagesPage implements OnInit {

  messages:Message[]=[];
  selectedMessagePage = SelectedMessagePage;
  createMessagePage = CreateMessagePage;

  constructor(private navCtrl: NavController ) {}

  ngOnInit(){
    this.messages = [{from: 'Hector Garcia', title: 'Stop being lame', body: 'This is a long time coming; lameness does not suit you buddy -- you need to man up dude', time: new Date(2017,6,20,0,0)}, {from: 'Hector Garcia', title: 'Stop being lame', body: 'This is a long time coming; lameness does not suit you buddy -- you need to man up dude', time: new Date(2017,6,20,0,0)}, {from: 'Hector Garcia', title: 'Stop being lame', body: 'This is a long time coming; lameness does not suit you buddy -- you need to man up dude', time: new Date(2017,6,20,0,0)}, {from: 'Hector Garcia', title: 'Stop being lame', body: 'This is a long time coming; lameness does not suit you buddy -- you need to man up dude', time: new Date(2017,6,20,0,0)}, {from: 'Hector Garcia', title: 'Stop being lame', body: 'This is a long time coming; lameness does not suit you buddy -- you need to man up dude', time: new Date(2017,6,20,0,0)}];

  }

  onSelectMessage(index:number){
    this.navCtrl.push(this.selectedMessagePage, {message: this.messages[index]});
  }

  onCreateMsg(){
    this.navCtrl.push(this.createMessagePage);
  }

}
