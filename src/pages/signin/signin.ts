import {Component, OnInit} from '@angular/core';
import {
  AlertController, IonicPage, LoadingController, ModalController, NavController,
  ToastController
} from 'ionic-angular';
import {TabsPage} from "../tabs/tabs";
import {AuthenticationService} from "../../services/authentication.service";
import {NgForm} from "@angular/forms";
import {DescribePage} from "../describe/describe";
import {User} from "../../models/user.model";
import {ProfileService} from "../../services/profile.service";
//import {ProfileService} from "../../services/profile.service";



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
              private profileService: ProfileService) {
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
          console.log(response);
          this.authService.updateLoggedInState(true);
          this.profileService.fetchProfile(response.token)
            .subscribe(
              (profile) => {
                console.log(profile);
                loading.dismiss().then(() => {
                  this.navCtrl.setRoot(this.tabPage);
                });
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



    // this.authService.signin(form.value.email, form.value.password)
    //   .then(() => {
    //     this.authService.getActiveUser().getIdToken().then((token)=>{
    //       console.log('signin', token);
    //       this.profileService.retrieveProfileFromServerDB(token).subscribe(
    //         (profile)=>{
    //           console.log(profile);
    //         },
    //         (error)=>{
    //           loading.dismiss();
    //           const alert = this.alertCtrl.create({
    //             title: 'Profile Retreival Failed',
    //             message: error.json().message,
    //             buttons: ['Ok']
    //           });
    //           alert.present();
    //         }
    //       );
    //     });
    //     loading.dismiss();
    //     //console.log(this.authService.getActiveUser());
    //   })
    //   .catch(error => {
    //     loading.dismiss();
    //     const alert = this.alertCtrl.create({
    //       title: 'Sign in failed',
    //       message: error.message,
    //       buttons: ['Ok']
    //     });
    //     alert.present();
    //   });


  onSignUp(form: NgForm) {
    const loading = this.loadingCtrl.create({
      content: 'Signing up',
    });

    loading.present();

    this.authService.signup(form.value.email, form.value.password)
      .subscribe((response) => {
          this.authService.updateLoggedInState(true);
          this.profileService.createProfile(response.token, {username:form.value.username, firstName:form.value.firstName, lastName:form.value.lastName, descriptors:[], locationTimes:[]})
            .subscribe((profile) => {
              const toast = this.toastCtrl.create({
                message: 'An email has been sent to ' + response.user.email + '.  Please confirm the email within 24 hours.',
                duration: 2000
              });
              loading.dismiss().then(() =>{
                toast.present();
                this.createDescriptorsModal();
              });
            });
          // this.authService.setUserDisplayName(form.value.username).then(()=>{
          //   console.log('username set', form.value.username, this.authService.getActiveUser().displayName);
          //   this.profileService.newProfile(this.authService.getActiveUser().displayName);
          //   loading.dismiss();
          //   const email = this.authService.getActiveUser().email;
        },
        (error) => {
          loading.dismiss();
          console.log(error);
          const alert = this.alertCtrl.create({
            title: 'Sign up failed',
            message: error.message,
            buttons: ['Ok']
          });
          alert.present();
        });
  }

  private createDescriptorsModal() {
      const modal = this.modalCtrl.create(this.describePage, {fromSignIn: true});
      modal.present().then(
        () => {this.navCtrl.setRoot(this.tabPage);}
      );
  }

  onNewUser(){
    this.isReturningUser = !this.isReturningUser;
  }


}
