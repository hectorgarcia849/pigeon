import {Component, OnInit, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {Pigeon} from "../../models/pigeon.model";
import {TabsService} from "../../services/tabs.service";
import {AuthenticationService} from "../../services/authentication.service";
import {SelectedMessagePage} from "../selected-message/selected-message";
import {TAB} from "../../utils/tab";

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
              private toastCtrl: ToastController,
              private authService: AuthenticationService) {
  }

  ngOnInit() {
    this.nav.setBackButtonText('BACK');
    this.pigeon = this.navParams.get('pigeon');
  }

  ionViewDidLoad() {
  }

  onLike(element){
    console.log('element liked');
  }

  onSendMessage() {
    if(this.pigeon._creator != this.authService.getUser()._id){
      this.navCtrl.pop();
      this.tabsService.changeTab(TAB.MESSAGES, [SelectedMessagePage], [{recipient: {username: this.pigeon.from, _id: this.pigeon._creator}, mode: 'newChat'}]);
    } else {
      const toast = this.toastCtrl.create({message:'Unable to write message to self', duration: 2000});
      toast.present();
    }
  }
}
