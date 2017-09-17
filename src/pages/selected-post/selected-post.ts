import {Component, OnInit, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {Pigeon} from "../../models/pigeon.model";
//import {SelectedMessagePage} from "../selected-message/selected-message";
import {TabsService} from "../../services/tabs.service";
//import {AuthenticationService} from "../../services/authentication.service";

@IonicPage()
@Component({
  selector: 'page-selected-post',
  templateUrl: 'selected-post.html'

})
export class SelectedPostPage implements OnInit {

  pigeon:Pigeon;

  @ViewChild('nav') nav;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private tabsService: TabsService,
              private toastCtrl: ToastController) {
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
    // if(this.pigeon.from.uid != this.authService.getActiveUser().uid){
    //   const messagesPageIndex = 1;
    //   this.navCtrl.pop();
    //   this.tabsService.changeIndex(messagesPageIndex, [SelectedMessagePage], [{messagesFrom: -1, sender: {username: this.pigeon.from.username, userId: this.pigeon.from.uid}, mode: 'newMessage'}]);
    // } else {
    //   const toast = this.toastCtrl.create({message:'Unable to write message to self', duration: 2000});
    //   toast.present();
  //   }
  }

}
