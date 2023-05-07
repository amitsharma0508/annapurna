import { Component, OnDestroy, OnInit } from '@angular/core';

import { AlertController, NavController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NetworkService } from './core/network.service';
import { Location } from '@angular/common';
import { AuthService } from './core/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Profile',
      url: '/dashboard/profile',
      icon: 'person'
    },
    {
      title: 'Login',
      url: '/login',
      icon: 'log-in'
    },
    {
      title: 'About Us',
      url: '/aboutus',
      icon: 'ribbon'
    },
    {
      title: 'Calculator',
      url: '/calculator',
      icon: 'calculator'
    },
    {
      title: 'Business',
      url: '/business',
      icon: 'business'
    },
    {
      title: 'Contact Us',
      url: '/contactus',
      icon: 'mail-unread'
    },
    {
      title: 'Feedback',
      url: '/feedback',
      icon: 'checkmark-circle'
    }
  ];

  status!: string;
  message!: string;
  css!: string;

  isAlertPresent = false;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private alertCtrl: AlertController,
    private _location: Location,
    private navCtrl: NavController,
    private networkService: NetworkService
  ) { }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.statusBar.overlaysWebView(false);
      this.statusBar.backgroundColorByHexString('#3880ff');
      this.statusBar.styleLightContent();
      this.splashScreen.hide();
    });

    this.platform.backButton.subscribeWithPriority(10, (processNextHandler) => {
      if (this._location.isCurrentPathEqualTo('/login')) {
        this.exitAppAlert();
        processNextHandler();
      } else if (this._location.isCurrentPathEqualTo('/dashboard')) {
        this.logoutAlert();
        processNextHandler();
      } else {
        this._location.back();
      }
    });

    this.platform.backButton.subscribeWithPriority(5, () => {
      this.alertCtrl.getTop().then(r => {
        if (r && this._location.isCurrentPathEqualTo('/login')) {
          let navigator: any;
          navigator['app'].exitApp();
        } else if (r && this._location.isCurrentPathEqualTo('/dashboard')) {
          // this.authService.logout();
          this.navCtrl.navigateForward('/login');
          this.alertCtrl.dismiss();
          this.isAlertPresent = false;
        }
      }).catch(e => {
        console.log(e);
      })
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: this.status.toUpperCase(),
      message: this.message,
      cssClass: this.css,
      buttons: ['OK']
    });
    await alert.present();
  }


  async exitAppAlert() {
    if (!this.isAlertPresent) {
      const alert = await this.alertCtrl.create({
        header: 'Exit',
        message: 'Do you want to exit?',
        cssClass: 'alert-warning',
        buttons: [
          {
            text: 'Exit',
            handler: () => {
              let navigator: any;
              navigator['app'].exitApp();
              this.isAlertPresent = false;
            }
          },
          {
            text: 'Stay',
            handler: () => {
              this.isAlertPresent = false;
            }
          }
        ],
        backdropDismiss: false
      });
      await alert.present();
      this.isAlertPresent = true;
    }
  }

  async logoutAlert() {
    if (!this.isAlertPresent) {
      const alert = await this.alertCtrl.create({
        header: 'Logout',
        message: 'Do you want to logout?',
        cssClass: 'alert-warning',
        buttons: [
          {
            text: 'Yes',
            handler: () => {
              // this.authService.logout();
              this.navCtrl.navigateForward('/login');
              this.isAlertPresent = false;
            }
          },
          {
            text: 'No',
            handler: () => {
              this.isAlertPresent = false;
            }
          }
        ],
        backdropDismiss: false
      });
      await alert.present();
      this.isAlertPresent = true;
    }
  }

}
