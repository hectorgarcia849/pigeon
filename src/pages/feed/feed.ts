import {Component, OnDestroy, OnInit} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {Pigeon} from "../../models/pigeon.model";
import {SelectedPigeonPage} from "../selected-pigeon/selected-pigeon";
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
  selectedPigeonPage = SelectedPigeonPage;
  pigeonsSubscription: Subscription;
  interval;

  constructor(private navCtrl: NavController,
              private pigeonService: PigeonService,
              private authService: AuthenticationService) {
  }

  ngOnInit(){}

  ionViewWillEnter(){

    this.authService.getLocalToken()
      .then((token) => {
        this.pigeonsSubscription = this.pigeonService.pigeons$.subscribe((pigeons:Pigeon[]) => {this.pigeons = pigeons.reverse();});
        this.refreshPigeons(token);
        this.interval = setInterval(() => {this.refreshPigeons(token);}, 20000);
      });
  }

  refreshPigeons(token: string){
    this.pigeonService.getPigeonsFromServer(token);
  }

  onPigeonTapped(index:number){
    this.navCtrl.push(this.selectedPigeonPage, {pigeon: this.pigeons[index]});
  }

  ngOnDestroy() {
    this.pigeonsSubscription.unsubscribe();
    clearInterval(this.interval);
  }

  convertTimestampToDate(timestamp:number){
    return new Date(timestamp);
  }

}
