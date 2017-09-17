import {Component, OnDestroy, ViewChild} from '@angular/core';
import {LoadingController, MenuController, NavController, Platform, ToastController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {SigninPage} from "../pages/signin/signin";
import {TabsPage} from "../pages/tabs/tabs";
import {AuthenticationService} from "../services/authentication.service";
// import {ProfileService} from "../services/profile.service";
import {TabsService} from "../services/tabs.service";
import {ProfileService} from "../services/profile.service";


//declare let config;

@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnDestroy{

  rootPage:any;
  signinPage = SigninPage;
  isLoggedIn = false;
  loggedInSubscription = this.authService.authState$.subscribe((state) => this.isLoggedIn = state);
  @ViewChild('nav') nav: NavController;

  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              private menuCtrl: MenuController,
              private tabsService: TabsService,
              private authService: AuthenticationService,
              private profileService: ProfileService,
              private toastCtrl: ToastController,
              private loadingCtrl: LoadingController) {

    // firebase.auth().onAuthStateChanged(user =>{
    //   if(user) { //checks if user is set, so authenticated/signed in
    //     this.isAuthenticated = true;
    //     this.rootPage = TabsPage;
    //     this.authService.getActiveUser().getIdToken().then((token)=>{
    //       this.profileService.retrieveProfileFromServerDB(token).subscribe(
    //         ()=>{
    //           console.log('successfully loaded profile on startup')
    //         },
    //         (error)=>{
    //           console.log('did not succeed in loading profile on startup', error.json());
    //         }
    //       );
    //     });
    //
    //   } else { //if not authenticated/not signed in
    //     this.isAuthenticated = false;
    //     this.rootPage = SigninPage;
    //   }
    // });

    //first, check if there is a token saved on the device, if so, auto log-in and set rootpage to tabspage, else rootpage is signin

    const loading = this.loadingCtrl.create({
      content: 'Signing in',
    });
    this.authService.getToken()
      .then((token) => {
        if(!token){
          this.rootPage = this.signinPage;
        } else {
          this.profileService.fetchProfile(token).subscribe(
            (profile) => {
              console.log(profile);
              loading.dismiss().then(() => {
                this.rootPage = TabsPage;
              });
            },
            (error) =>{
              console.log(error);
              if(error.status === 404){

              }
            }
          );
          this.authService.updateLoggedInState(true);
        }
      }).catch(() => {this.rootPage = TabsPage});

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  onLoad(page: any){
    this.nav.setRoot(page);
    this.menuCtrl.close();
  }

  onLogOut(page: any){
    this.tabsService.changeIndex(2,[]); //takes us back to the feed just prior to log out.
    this.authService.logout()
      .then(() => {
        this.authService.updateLoggedInState(false);
        this.onLoad(page);})
      .catch((e) => {
        const toast = this.toastCtrl.create({
          message:'Unable to logout at this time',
          duration: 2000
        });
        toast.present();
      });
  }

  ngOnDestroy(){
    this.loggedInSubscription.unsubscribe();
  }

}

