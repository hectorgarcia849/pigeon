import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import {CreateMessagePage} from "../pages/create-message/create-message";
import {DescribePage} from "../pages/describe/describe";
import {CreatePostPage} from "../pages/create-post/create-post";
import {FeedPage} from "../pages/feed/feed";
import {SelectedMessagePage} from "../pages/selected-message/selected-message";
import {SelectedPostPage} from "../pages/selected-post/selected-post";
import {SigninPage} from "../pages/signin/signin";
import {MessagesPage} from "../pages/messages/messages";
import {MomentModule} from "angular2-moment";
import {TabsPage} from "../pages/tabs/tabs";
import {ProfilePage} from "../pages/profile/profile";
import {Keyboard} from "@ionic-native/keyboard";
import {ProfileService} from "../services/profile.service";
import {AuthenticationService} from "../services/authentication.service";
import {ComponentsModule} from "../components/components.module";
import {HttpModule} from "@angular/http";
import {PigeonService} from "../services/pigeon.service";


;

@NgModule({
  declarations: [
    MyApp,
    CreateMessagePage,
    CreatePostPage,
    DescribePage,
    FeedPage,
    MessagesPage,
    SelectedMessagePage,
    SelectedPostPage,
    SigninPage,
    TabsPage,
    ProfilePage,
    MessagesPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    MomentModule,
    ComponentsModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CreateMessagePage,
    CreatePostPage,
    DescribePage,
    FeedPage,
    MessagesPage,
    SelectedMessagePage,
    SelectedPostPage,
    SigninPage,
    TabsPage,
    ProfilePage,
    MessagesPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Keyboard,
    ProfileService,
    AuthenticationService,
    PigeonService
  ]
})
export class AppModule {}
