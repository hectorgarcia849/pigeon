import {Component, OnInit } from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-describe',
  templateUrl: 'describe.html',
})
export class DescribePage {

  descriptors:number = 0;
  fromSignIn:boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.fromSignIn = this.navParams.get('fromSignIn');
  }

  onNext() {
    this.navCtrl.pop();
  }

}
