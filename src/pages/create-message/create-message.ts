import { Component } from '@angular/core';
import { IonicPage  } from 'ionic-angular';
import {MessagesService} from "../../services/messages.service";

@IonicPage()
@Component({
  selector: 'page-create-message',
  templateUrl: 'create-message.html',
})
export class CreateMessagePage {

  constructor(private messagesService: MessagesService) {
  }






}
