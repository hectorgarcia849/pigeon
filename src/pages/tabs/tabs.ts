import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {IonicPage, NavController, Tab, Tabs} from 'ionic-angular';
import {FeedPage} from "../feed/feed";
import {MessagesPage} from "../messages/messages";
import {ProfilePage} from "../profile/profile";
import {Keyboard} from "@ionic-native/keyboard";
import {CreatePostPage} from "../create-post/create-post";
import {TabsService} from "../../services/tabs.service";
import {Subscription} from "rxjs/Subscription";
import {TabServiceObjectModel} from "../../models/tab-service-object.model";

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage implements OnInit, OnDestroy {

  feedPage = FeedPage;
  messagesPage = MessagesPage;
  profilePage = ProfilePage;
  createPostPage = CreatePostPage;
  isKeyboardShowing = false;
  keyboardOpen;
  keyboardClosed;
  subscription:Subscription;
  index:number = 2;

  @ViewChild('tabs') tabsRef: Tabs;
  @ViewChild('messagestab') msgTab: Tab;
  @ViewChild('profiletab') profileTab: Tab;
  @ViewChild('feedtab') feedTab: Tab;
  @ViewChild('createpigeontab') pigeonTab: Tab;


  constructor(private keyboard: Keyboard, private tabsService: TabsService, private navCtrl: NavController) {}

  ngOnInit() {
    this.keyboardOpen = this.keyboard.onKeyboardShow().subscribe((data) => { console.log('kb shown'); this.isKeyboardShowing = true; });
    this.keyboardClosed = this.keyboard.onKeyboardHide().subscribe((data) => { console.log('kb hid'); this.isKeyboardShowing = false; });
    this.subscription = this.tabsService.navItem$
      .subscribe((data: TabServiceObjectModel) => {
        console.log(data);
        if(data.index > -1) {
          this.index = data.index;
        }
        this.tabsRef.select(this.index);
        for(let i = 0; i < data.loadChild.length; i++){
          if(data.loadOptions.length > 0){
            const params = data.loadOptions[i];
            this.navCtrl.push(data.loadChild[i], params);
            console.log(data.loadChild[i], params);
          } else {
            this.navCtrl.push(data.loadChild[i]);
          }
        }

      });
  }

  isKeyboardOpen() {
    if(this.isKeyboardShowing) {
      this.tabsRef.setTabbarHidden(true);
    }
    else {
      this.tabsRef.setTabbarHidden(false);

    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
