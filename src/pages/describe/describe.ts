import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-describe',
  templateUrl: 'describe.html',
})
export class DescribePage {

  descriptors: number = 0;
  pageTransitionIsFromSignIn:boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.pageTransitionIsFromSignIn = this.navParams.get('pageTransitionIsFromSignIn');
  }

  onNext() {
    this.navCtrl.pop();
  }

}
