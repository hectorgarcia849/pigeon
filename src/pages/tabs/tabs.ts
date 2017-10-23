import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {IonicPage, NavController, Tab, Tabs} from 'ionic-angular';
import {FeedPage} from "../feed/feed";
import {MessagesPage} from "../messages/messages";
import {ProfilePage} from "../profile/profile";
import {Keyboard} from "@ionic-native/keyboard";
import {CreatePigeonPage} from "../create-pigeon/create-pigeon";
import {TabsService} from "../../services/tabs.service";
import {Subscription} from "rxjs/Subscription";
import {TabServiceObjectModel} from "../../models/tab-service-object.model";
import {TAB} from "../../utils/tab";

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage implements OnInit, OnDestroy {

  feedPage = FeedPage;
  messagesPage = MessagesPage;
  profilePage = ProfilePage;
  createPostPage = CreatePigeonPage;
  isKeyboardShowing = false;
  keyboardOpen;
  keyboardClosed;
  remoteTabChangeSubscription: Subscription;
  tab: TAB = TAB.FEED;

  @ViewChild('tabs') tabsRef: Tabs;
  @ViewChild('messagestab') msgTab: Tab;
  @ViewChild('profiletab') profileTab: Tab;
  @ViewChild('feedtab') feedTab: Tab;
  @ViewChild('createpigeontab') pigeonTab: Tab;


  constructor(private keyboard: Keyboard, private tabsService: TabsService, private navCtrl: NavController) {}

  ngOnInit() {
    this.subscribeToKeyboardEvents();
    this.subscribeToRemoteTabChangeEvents();
  }

  isKeyboardOpen() {
    if(this.isKeyboardShowing) {
      this.tabsRef.setTabbarHidden(true);
    }
    else {
      this.tabsRef.setTabbarHidden(false);
    }
  }

  subscribeToKeyboardEvents() {
    this.keyboardOpen = this.keyboard.onKeyboardShow()
      .subscribe(() => this.isKeyboardShowing = true);
    this.keyboardClosed = this.keyboard.onKeyboardHide()
      .subscribe(() => this.isKeyboardShowing = false);
  }

  subscribeToRemoteTabChangeEvents() {
    this.remoteTabChangeSubscription = this.tabsService.tabChange$
      .subscribe(
        (data: TabServiceObjectModel) => {
          if(data.rootTab > -1) {
            this.tab = data.rootTab;
          }
          this.tabsRef.select(this.tab);
          this.pushPagesWithOptions(data.pagesToPush, data.loadOptions);
        });
  }

  pushPagesWithOptions(pages: any[], options: any[]) {
    for(let i = 0; i < pages.length; i++){
      const params = options[i];
      const page = pages[i];
      this.navCtrl.push(page, params);
    }
  }
  ngOnDestroy() {
    this.remoteTabChangeSubscription.unsubscribe();
  }

}
