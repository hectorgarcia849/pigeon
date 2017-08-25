import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {Pigeon} from "../../models/pigeon.model";
import {SelectedPostPage} from "../selected-post/selected-post";
import {PigeonService} from "../../services/pigeon.service";

@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
})
export class FeedPage implements OnInit{

  pigeons: Pigeon[] = [];
  selectedPostPage = SelectedPostPage;

  constructor(private navCtrl: NavController,
              private pigeonService: PigeonService) {
  }

  ngOnInit(){
  }

  ionViewWillEnter(){
    this.pigeonService.getPigeons().on('value', (pigeons) => {
      this.pigeons = this.pigeonService.snapshotToArray(pigeons);
    });
  }

  onTap(index:number){
    this.navCtrl.push(this.selectedPostPage, {pigeon: this.pigeons[index]});
  }


}
