import {Component, ViewChild} from '@angular/core';
import {MenuController, NavController, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {SigninPage} from "../pages/signin/signin";
import {TabsPage} from "../pages/tabs/tabs";
import firebase from 'firebase';
import {AuthenticationService} from "../services/authentication.service";
import {ProfileService} from "../services/profile.service";

declare let config;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage:any;
  signinPage = SigninPage;
  isAuthenticated = false;
  @ViewChild('nav') nav: NavController;

  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              private menuCtrl: MenuController,
              private authService: AuthenticationService,
              private profileService: ProfileService) {
    firebase.initializeApp({
      apiKey: config.apiKey,
      authDomain: config.authDomain,
      databaseURL: config.databaseURL,
      projectId: config.projectId,
      storageBucket: config.storageBucket,
      messagingSenderId: config.messagingSenderId
    });

    firebase.auth().onAuthStateChanged(user =>{
      if(user) { //checks if user is set, so authenticated/signed in
        this.isAuthenticated = true;
        this.rootPage = TabsPage;
        this.authService.getActiveUser().getIdToken().then((token)=>{
          this.profileService.retrieveProfileFromServerDB(token).subscribe(
            ()=>{
              console.log('successfully loaded profile on startup')
            },
            (error)=>{
              console.log('did not succeed in loading profile on startup', error.json());
            }
          );
        });

      } else { //if not authenticated/not signed in
        this.isAuthenticated = false;
        this.rootPage = SigninPage;
      }
    });




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
    this.authService.logout()
      .then(() => this.onLoad(page));

  }

}

