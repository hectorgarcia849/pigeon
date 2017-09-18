import {Component, OnDestroy, OnInit} from '@angular/core';
import {IonicPage, NavController, ToastController} from 'ionic-angular';
import {Pigeon} from "../../models/pigeon.model";
import {SelectedPostPage} from "../selected-post/selected-post";
import {PigeonService} from "../../services/pigeon.service";
import {Subscription} from "rxjs/Subscription";
import {AuthenticationService} from "../../services/authentication.service";

@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
})
export class FeedPage implements OnInit, OnDestroy {

  pigeons: Pigeon[] = [];
  selectedPostPage = SelectedPostPage;
  pigeonsSubscription: Subscription;
  interval;

  constructor(private navCtrl: NavController,
              private pigeonService: PigeonService,
              private authService: AuthenticationService,
              private toastCtrl: ToastController) {
  }

  ngOnInit(){

  }

  ionViewWillEnter(){

    this.authService.getToken()
      .then((token) => {
        this.pigeonsSubscription = this.pigeonService.pigeons$.subscribe((pigeons:Pigeon[]) => {this.pigeons = pigeons;});
        //this.pigeonService.getPigeons(token).subscribe((pigeons: Pigeon[]) => {this.pigeons = pigeons;})})
        this.refreshPigeons(token);
        this.interval = setInterval(() => {this.refreshPigeons(token);}, 20000);
      });
  }

  refreshPigeons(token:string){
    this.pigeonService.getPigeons(token);
  }

  onTap(index:number){
    this.navCtrl.push(this.selectedPostPage, {pigeon: this.pigeons[index]});
  }

  ngOnDestroy() {
    this.pigeonsSubscription.unsubscribe();
    clearInterval(this.interval);
  }

  convertTimestampToDate(timestamp:number){
    return new Date(timestamp);
  }

}
