import { Component } from '@angular/core';
import { IonicPage  } from 'ionic-angular';
// import {MessagesService} from "../../services/messages.service";
import {Message} from "../../models/message.model";

@IonicPage()
@Component({
  selector: 'page-create-message',
  templateUrl: 'create-message.html',
})
export class CreateMessagePage {

  constructor() {
  }


  sendMessage(message:Message){}






}
