import { Component } from '@angular/core';
import {ChatBubbleData} from "../../models/ChatBubbleData.model";

@Component({
  selector: 'chat-bubble',
  templateUrl: 'chat-bubble.html',
  inputs:['msg:message']
})
export class ChatBubbleComponent {

  msg:ChatBubbleData;

  constructor() {
  }

}

