import {Component, OnInit, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Pigeon} from "../../models/pigeon.model";
import {SelectedMessagePage} from "../selected-message/selected-message";
import {TabsService} from "../../services/tabs.service";

@IonicPage()
@Component({
  selector: 'page-selected-post',
  templateUrl: 'selected-post.html'

})
export class SelectedPostPage implements OnInit {

  pigeon:Pigeon;

  @ViewChild('nav') nav;

  constructor(public navCtrl: NavController, public navParams: NavParams, private tabsService: TabsService) {
  }

  ngOnInit() {
    this.nav.setBackButtonText('BACK');
    this.pigeon = this.navParams.get('pigeon');
    console.log(this.pigeon);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectedPostPage');
  }

  onLike(element){
  }

  onSendMessage() {
    console.log('sendMessage');
    const messagesPageIndex = 1;
    this.navCtrl.pop();
    this.tabsService.changeIndex(messagesPageIndex, [SelectedMessagePage], [{messagesFrom: -1, sender: 'new', mode: 'newMessage'}]);
  }

}
