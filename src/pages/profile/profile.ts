import { Component } from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {DescribePage} from "../describe/describe";

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  describePage = DescribePage;

  constructor(private navCtrl: NavController ) {
  }


  onDescriptorsClicked(){
    this.navCtrl.push(this.describePage, {pageTransitionIsfromSignIn: false});
  }

}
