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
import {TAB} from "../utils/tab";
import {Subscription} from "rxjs/Subscription";
import {User} from "../models/user.model";

@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnInit, OnDestroy{

  rootPage: any;
  isLoggedIn;
  isLoggedInSubscription: Subscription;
  profileSubscription: Subscription;
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

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  ngOnInit(){
    /*
      first, check if there is a token saved on the device,
      if so, auto log-in and set rootpage to tabspage, else
      set rootpage to signin
    */

    //moved this code from auth service, cannot encapsulate the log in process, refer to the three different authentication
    //processes.  The LoggedInSubject may need to be abstracted out of the auth service, we only want to call it if the user,
    // profile and chatprofile loaded.

    this.authService.getLocalToken()
      .then(
        (token) => {
            this.authService.getUserFromDatabase(token)
              .subscribe(() => {
                  this.profileService.getProfileFromServer(token)
                    .subscribe(() => {
                      this.profileService.broadcastProfile();
                      this.msgService.getChatProfileForUserOnServer(token)
                        .subscribe(() => {
                          this.authService.updateLoggedInSubject(true);
                          this.msgService.connect(token);
                        })
                    });
                },
                (e) => {
                  this.authService.updateLoggedInSubject(false);
                }
              )
        }
      )
      .catch((e) => {
        this.authService.updateLoggedInSubject(false);
    });

    this.isLoggedInSubscription =
      this.authService
        .isLoggedIn$.subscribe(
          (isLoggedIn: boolean) => {
            this.isLoggedIn = isLoggedIn;

            this.setRootPage();
            this.profileSubscription =
              this.profileService
                .profile$
                .subscribe((profile) => this.username = profile.username);
          }
        );

  }

  onLogOut(){
    //takes user back to the feed just prior to log out.
    this.tabsService.changeTab(TAB.FEED, []);
    this.authService.logout()
      .then(() => {
        this.menuCtrl.close();
      })
      .catch((e) => {
        const toast = this.toastCtrl.create({
          message:'Unable to logout at this time',
          duration: 2000
        });
        toast.present();
      });
  }

  ngOnDestroy(){
    this.isLoggedInSubscription.unsubscribe();
    this.profileSubscription.unsubscribe();
  }

  setRootPage() {
    if(this.isLoggedIn) {
      this.rootPage = TabsPage;
    } else {
      this.rootPage = SigninPage;
    }
  }
}

