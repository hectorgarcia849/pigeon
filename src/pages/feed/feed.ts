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

  constructor(private navCtrl: NavController,
              private pigeonService: PigeonService,
              private authService: AuthenticationService,
              private toastCtrl: ToastController) {
  }

  ngOnInit(){
  }

  ionViewWillEnter(){
    this.authService.getToken()
      .then((token) =>{
        this.pigeonsSubscription = this.pigeonService.getPigeons(token)
          .subscribe(
            (pigeons: Pigeon[]) => {
              if(pigeons){
                this.pigeons = pigeons;
              }
            },
            (error) => {
              const toast = this.toastCtrl.create({message: "Unable to load feed at this time", duration: 2000});
              toast.present();
            });

    });
  }

  onTap(index:number){
    this.navCtrl.push(this.selectedPostPage, {pigeon: this.pigeons[index]});
  }

  ngOnDestroy() {
    this.pigeonsSubscription.unsubscribe();
  }

  convertTimestampToDate(timestamp:number){
    return new Date(timestamp);
  }

}
