import {Component, ViewChild} from '@angular/core';
import {AlertController, DateTime, IonicPage, LoadingController, NavController} from 'ionic-angular';
import {PigeonService} from "../../services/pigeon.service";
import {NgForm} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication.service";
import {FeedPage} from "../feed/feed";



@IonicPage()
@Component({
  selector: 'page-create-post',
  templateUrl: 'create-post.html',
})
export class CreatePostPage {

  feedPage = FeedPage;

@ViewChild('datetime') datetime:DateTime;

  constructor(private pigeonService: PigeonService,
              private authService: AuthenticationService,
              private loadingCtrl: LoadingController,
              private navCtrl: NavController,
              private alertCtrl: AlertController){
  }

  ionViewWillEnter(){
    const today = new Date().toISOString();
    this.datetime.setValue(today);
    this.datetime.max = today;
  }

  onSendPigeon(form: NgForm) {
    const message = {title:form.value.title, to:form.value.to, body:form.value.body, date:form.value.date};
    const loading = this.loadingCtrl.create({content: 'Sending Pigeon'});
    loading.present();
    return this.authService.getActiveUser().getIdToken()
      .then((token)=>{
        this.pigeonService.sendPigeon(message, token).subscribe(
          ()=>{
            form.reset();
            this.navCtrl.setRoot(this.feedPage);
            loading.dismiss();
          },
          (error)=>{
            loading.dismiss();
            const alert = this.alertCtrl.create({
              title: 'Error Occurred',
              message: error.json().error
              });
            alert.present();
          })
      });
  }
}
