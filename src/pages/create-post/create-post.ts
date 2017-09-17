import {Component, ViewChild} from '@angular/core';
import {AlertController, DateTime, IonicPage, LoadingController, NavController} from 'ionic-angular';
import {PigeonService} from "../../services/pigeon.service";
import {NgForm} from "@angular/forms";
import {FeedPage} from "../feed/feed";
import {Pigeon} from "../../models/pigeon.model";
import {ProfileService} from "../../services/profile.service";
import {AuthenticationService} from "../../services/authentication.service";
import {TabsService} from "../../services/tabs.service";



@IonicPage()
@Component({
  selector: 'page-create-post',
  templateUrl: 'create-post.html',
})
export class CreatePostPage {

  feedPage = FeedPage;

@ViewChild('datetime') datetime:DateTime;

  constructor(private pigeonService: PigeonService,
              private loadingCtrl: LoadingController,
              private navCtrl: NavController,
              private alertCtrl: AlertController,
              private profileService: ProfileService,
              private authService: AuthenticationService,
              private tabsService: TabsService){
  }

  ionViewWillEnter(){
    const today = new Date().toISOString();
    this.datetime.setValue(today);
    this.datetime.max = today;
  }

  onSendPigeon(form: NgForm) {
    const from = this.profileService.getProfile().username;
    const pigeon = {title:form.value.title, to:form.value.to, from, body:form.value.body, encounterDate:new Date(form.value.date).getTime()};
    const loading = this.loadingCtrl.create({content: 'Sending Pigeon'});
    loading.present();

    this.authService.getToken()
      .then((token) => {
        return this.pigeonService
          .sendPigeon(token, pigeon)
          .subscribe(
              (sentPigeon:Pigeon) => {
                loading.dismiss().then(() => {
                  this.tabsService.changeIndex(2, []);
                  form.reset();
                });
              },
            (error) => {
                loading.dismiss();
                const alert = this.alertCtrl.create({
                  title: 'An error occurred.  Please try again later.',
                  message: error.json().error
                });
                alert.present();
            }
          );
      });
  }
}
