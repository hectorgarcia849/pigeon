import {Component, OnInit} from '@angular/core';
import {IonicPage, NavParams} from 'ionic-angular';
import {Message} from "../../models/message.model";
import {Keyboard} from "@ionic-native/keyboard";

@IonicPage()
@Component({
  selector: 'page-selected-message',
  templateUrl: 'selected-message.html',
})
export class SelectedMessagePage implements OnInit {

  message:Message;

  constructor(public navParams: NavParams, private keyboard: Keyboard) {
  }

  ngOnInit() {
    this.message = this.navParams.get('message');
  }

  ionViewDidLoad() {
    this.keyboard.show();
}

}
