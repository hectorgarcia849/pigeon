import { Component } from '@angular/core';
import {IonicPage, ModalController, NavController} from 'ionic-angular';
import {DescribePage} from "../describe/describe";

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  describePage = DescribePage;

  constructor(private modalCtrl: ModalController, private navCtrl: NavController ) {
  }


  onDescriptorsClicked(){
    // const modal = this.modalCtrl.create(this.describePage, {fromSignIn: false});
    // modal.present();

    this.navCtrl.push(this.describePage, {fromSignIn: false});
  }

}
