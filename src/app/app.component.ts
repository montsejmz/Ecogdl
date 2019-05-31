import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as firebase from 'firebase';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';

export const config = {
  apiKey: "AIzaSyDucn2enzYPkQEMGZIxXAjTPBG4MsvqVbw",
  authDomain: "ecogdl-51398.firebaseapp.com",
  databaseURL: "https://ecogdl-51398.firebaseio.com",
  projectId: "ecogdl-51398",
  storageBucket: "ecogdl-51398.appspot.com",
  messagingSenderId: "814822845081",
  appId: "1:814822845081:web:a66a39ab786272fa"
};


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    firebase.initializeApp(config);
  }
}

