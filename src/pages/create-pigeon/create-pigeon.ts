import {Component, ViewChild} from '@angular/core';
import {AlertController, DateTime, IonicPage, Loading, LoadingController} from 'ionic-angular';
import {PigeonService} from "../../services/pigeon.service";
import { NgForm} from "@angular/forms";
import {Pigeon} from "../../models/pigeon.model";
import {ProfileService} from "../../services/profile.service";
import {AuthenticationService} from "../../services/authentication.service";
import {TabsService} from "../../services/tabs.service";
import {TAB} from "../../utils/tab";



@IonicPage()
@Component({
  selector: 'page-create-pigeon',
  templateUrl: 'create-pigeon.html',
})
export class CreatePigeonPage {

  loading: Loading;
  @ViewChild('datetime') datetime: DateTime;
  @ViewChild('f') form: NgForm;

  constructor(private pigeonService: PigeonService,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController,
              private profileService: ProfileService,
              private authService: AuthenticationService,
              private tabsService: TabsService){
  }

  ionViewWillEnter(){
    this.setupDateTimeControl();
  }

  onSendPigeon() {

    this.loading = this.loadingCtrl.create({content: 'Sending Pigeon'});
    this.loading.present();

    const pigeon = this.createPigeon();
    this.authService.getLocalToken()
      .then((token) => {
        return this.pigeonService.sendPigeon(token, pigeon)
          .subscribe(
            (sentPigeon: Pigeon) => {
              this.loading.dismiss()
                .then(() => {
                  this.tabsService.changeTab(TAB.FEED, []);
                  this.form.reset();
              });
            },
            (error) => {
              this.loading.dismiss();
              const alert = this.alertCtrl.create({
                title: 'An error occurred.  Please try again later.',
                message: error.json().error
              });
              alert.present();
            }
          );
      });
  }

  createPigeon(): Pigeon {
    return {
      created: null,
      _creator: null,
      title: this.form.value.title,
      to: this.form.value.to,
      from: this.profileService.getProfile().username,
      body: this.form.value.body,
      encounterDate: new Date(this.form.value.date).getTime()
    };
  }

  setupDateTimeControl() {
    const today = new Date().toISOString();
    this.datetime.setValue(today);
    this.datetime.max = today;
  }
}
