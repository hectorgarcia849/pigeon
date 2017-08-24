import {Component, OnInit, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Pigeon} from "../../models/pigeon.model";

/**
 * Generated class for the SelectedPostPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-selected-post',
  templateUrl: 'selected-post.html',
})
export class SelectedPostPage implements OnInit {

  pigeon:Pigeon;
  @ViewChild('nav') nav;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
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

}
