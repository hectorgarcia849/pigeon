import {Component, OnInit} from '@angular/core';
import {
  AlertController, IonicPage, LoadingController, ModalController, NavController,
  ToastController
} from 'ionic-angular';
import {TabsPage} from "../tabs/tabs";
import {AuthenticationService} from "../../services/authentication.service";
import {NgForm} from "@angular/forms";
import {DescribePage} from "../describe/describe";
import {ProfileService} from "../../services/profile.service";
import {MessagesService} from "../../services/messages.service";



@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage implements OnInit {

  describePage = DescribePage;
  tabPage = TabsPage;
  isReturningUser = true;

  constructor(private navCtrl:NavController,
              private modalCtrl:ModalController,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              private authService: AuthenticationService,
              private profileService: ProfileService,
              private msgService: MessagesService) {
  }

  ngOnInit() {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
  }

  onSubmit(form: NgForm) {
    if(this.isReturningUser){
      this.onSignIn(form);
    } else {
      this.onSignUp(form);
    }
  }

  onSignIn(form: NgForm){
    const loading = this.loadingCtrl.create({
      content: 'Signing in',
    });

    loading.present();
    this.authService.signin(form.value.email, form.value.password)
      .subscribe(
        (response) => {
          this.profileService.getProfileFromServer(response.token)
            .subscribe(
              () => {
                this.profileService.broadcastProfile();
                loading.dismiss()
                  .then(() => {
                    this.navCtrl.setRoot(this.tabPage);
                    this.msgService.getChatProfileForUserOnServer(response.token)
                    .subscribe(() => {
                      console.log('got chatProfile for signed in user');
                      this.msgService.connect(response.token);
                    });
                });
              }
            );

        },
        (error) => {
          loading.dismiss().then(() => {
            console.log(error);
            if (error.status === 404) {
              const alert = this.alertCtrl.create({
                title: 'Username/Password is incorrect',
                message: error.message,
                buttons: ['Ok']
              });
              alert.present();
            }

          });
        }
      );
  }

  onSignUp(form: NgForm) {
    const loading = this.loadingCtrl.create({
      content: 'Signing up'
    });
    loading.present();
    this.authService.signup(form.value.email, form.value.password)
      .subscribe((response) => {
          this.profileService.createProfileOnServer(response.token, {username: form.value.username, firstName: form.value.firstName, lastName: form.value.lastName, descriptors: [], locationTimes: []})
            .subscribe((profile) => {
              this.profileService.broadcastProfile();
              const toast = this.toastCtrl.create({
                message: 'An email has been sent to ' + response.user.email + '.  Please confirm the email within 24 hours.',
                duration: 2000
              });
              this.msgService.createChatProfileForUserOnServer(response.token, response.user._id)
                .subscribe(() => {
                console.log('created chatProfile for new user');
                this.msgService.connect(response.token);
              });
              loading.dismiss()
                .then(() => {
                  toast.present();
                  this.createDescriptorsModal();
              });
            });
        },
        (error) => {
          loading.dismiss();
          this.showUserErrorAlert(error.message, 'Sign up Failed');
        });
  }

  private createDescriptorsModal() {
      const modal = this.modalCtrl.create(this.describePage, {pageTransitionIsFromSignIn: true});
      modal.present().then(
        () => {this.navCtrl.setRoot(this.tabPage);}
      );
  }

  onNewUser(){
    this.isReturningUser = !this.isReturningUser;
  }

  showUserErrorAlert(message: string, title: string) {
    const alert = this.alertCtrl.create({
      title,
      message,
      buttons: ['Ok']
    });
    alert.present();
  }
}
