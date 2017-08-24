import {Component, OnInit} from '@angular/core';
import { IonicPage } from 'ionic-angular';
import {FeedPage} from "../feed/feed";
import {MessagesPage} from "../messages/messages";
import {ProfilePage} from "../profile/profile";
import {Keyboard} from "@ionic-native/keyboard";
import {CreatePostPage} from "../create-post/create-post";
import {AuthenticationService} from "../../services/authentication.service";

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage implements OnInit {

  feedPage = FeedPage;
  messagesPage = MessagesPage;
  profilePage = ProfilePage;
  createPostPage = CreatePostPage;
  isKeyboardShowing = false;
  keyboardOpen;
  keyboardClosed;

  constructor(private keyboard: Keyboard) {}

  ngOnInit() {
    this.keyboardOpen = this.keyboard.onKeyboardShow().subscribe((data) => { console.log('kb shown'); this.isKeyboardShowing = true; });
    this.keyboardClosed = this.keyboard.onKeyboardHide().subscribe((data) => { console.log('kb hid'); this.isKeyboardShowing = false; });
  }

  isKeyboardOpen() {
    if(this.isKeyboardShowing) {
      return "tabbar hide-tabbar";
    }
    else {
      return "tabbar show-tabbar";
    }
  }

}
