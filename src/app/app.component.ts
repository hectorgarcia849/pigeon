import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {LoadingController, MenuController, NavController, Platform, ToastController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {SigninPage} from "../pages/signin/signin";
import {TabsPage} from "../pages/tabs/tabs";
import {AuthenticationService} from "../services/authentication.service";
import {TabsService} from "../services/tabs.service";
import {ProfileService} from "../services/profile.service";
import {MessagesService} from "../services/messages.service";
import {Message} from "../models/message.model"


//declare let config;

@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnInit, OnDestroy{

  rootPage:any;
  signinPage = SigninPage;
  isLoggedIn = false;
  loggedInSubscription = this.authService.authState$.subscribe((state) => this.isLoggedIn = state);
  username = "";

  @ViewChild('nav') nav: NavController;

  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              private menuCtrl: MenuController,
              private tabsService: TabsService,
              private authService: AuthenticationService,
              private profileService: ProfileService,
              private toastCtrl: ToastController,
              private loadingCtrl: LoadingController,
              private msgService: MessagesService) {

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
              this.username = profile.username;
              loading.dismiss().then(() => {
                this.rootPage = TabsPage;
              });
            },
            (error) => {
              console.log(error);
              if(error.status === 404){
              }
            }
          );
          this.authService.updateLoggedInState(true);
          this.msgService.connect(token);

          const message = new Message({username:'fromUser', userId:'123'}, {username:'ToUser', userId:'456'}, 'message');
          this.msgService.sendMessage(message);
        }
      }).catch(() => {this.rootPage = TabsPage});

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  ngOnInit(){

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

