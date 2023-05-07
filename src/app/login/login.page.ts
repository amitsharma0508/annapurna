import { Component, OnInit } from '@angular/core';
import { DataService } from '../core/data.service';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AUTHENTICATED_USER, AuthService } from '../core/auth.service';
import { AlertController, MenuController, NavController, Platform, ToastController } from '@ionic/angular';
import { Market } from '@ionic-native/market/ngx';
// import { NetworkStatus, PluginListenerHandle, Network, App } from '@capacitor/core';
import { NetworkService } from '../core/network.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: any= FormGroup;
  advertisementImages: any;
  status!: string;
  message!: string;
  css!: string;
  cidNo: any;
  isLogin:boolean=true;
  isTypePassword: boolean = true;

  constructor(
    private dataService: DataService,
    private callNumber: CallNumber,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private navCtrl: NavController,
    private market: Market,
    private networkService: NetworkService
  ) { }

  ngOnInit() {
    this.cidNo = localStorage.getItem('cid');
    this.createForm();
    document.addEventListener('deviceready', () => {
      this.checkAppVersion();
      this.getAdvertisementImages();
    });
    this.getAdvertisementImages();

    // if(this.networkService.getCurrentNetworkStatus() === 1){
    //   this.status = 'Internet Required!';
    //   this.message = 'No internet connection detected, please connect to internet and try again.';
    //   this.css = 'alert-warning';
    //   this.presentAlert();
    // }
  }

  onSwitchAuthMode(){
    this.isLogin = !this.isLogin;
  }

  checkAppVersion() {
    console.log("version Checked")
    this.dataService.getAppVersion().subscribe((response: any) => {
      const responseVariable = JSON.parse(response.data);
      if (responseVariable[0].updatestatus === 'Y') {
        const updateStatus = localStorage.getItem('updateStatus');
        if (updateStatus === 'N' || updateStatus === null) {
          this.status = 'Update Available';
          this.message = 'There is an update available. Please update the app.';
          this.updateAlert();
        }
      }
    });
  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      cidNo: [this.cidNo, Validators.required],
      password: ['', Validators.required]
    });

    // if (this.cidNo) {
    //   this.loginForm.get('cidNo').disable();
    // }
    this.loginForm.value.password.valid;
  }

  login() {
    if (this.loginForm.invalid) {
      return;
    } else {
      this.navCtrl.navigateForward('/dashboard');
    }
    //   // this.navCtrl.navigateForward('/dashboard');
    //   const cidNo = this.loginForm.value.cidNo;
    //   const password = this.loginForm.value.password;
    //   console.log('cidNo', cidNo, password);
    //   this.dataService.userProfile(cidNo).subscribe((res: { length: any; data: any; }) => {
    //     const response = res;
    //     if (response != null) {
    //       this.authService.validateLogin(cidNo, password).subscribe((response: any) => {
    //         console.log('response', response);
    //         // const responseVariable = res;
    //         if (response.existStatus != '1') {
    //           this.status = 'Login Failed';
    //           this.message = 'Incorrect username or password. Click on FORGOT PASSWORD to reset your password.';
    //           this.css = 'alert-warning';
    //           this.presentAlert();
    //         } else {
    //           localStorage.setItem('cid', cidNo);
    //           this.authService.setItem(AUTHENTICATED_USER, cidNo);
    //           this.navCtrl.navigateForward('/dashboard');
    //           // this.loginForm.controls.password.setValue('');
    //         }
    //       },(error) => {
    //         console.error(error);
    //         this.status = 'Error';
    //         this.message = 'Error occurred during validation with server';
    //         this.css = 'alert-error';
    //         this.presentAlert();
    //         this.navCtrl.navigateForward('/dashboard');
    //       });

    //     } else {
    //       this.status = 'Warning'
    //       this.message = 'Your are not a registered user. Please register by clicking on NEW USER? SIGN UP .';
    //       this.css = 'alert-warning';
    //       this.presentAlert();
    //     }

    //   });
    // }

    // const cidNo = this.loginForm.get('cidNo').value;
    // localStorage.setItem('cid', cidNo);
    // this.navCtrl.navigateForward('/dashboard');
  }

  call() {
    this.callNumber.callNumber("1818", true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }

  getAdvertisementImages() {
    this.dataService.getAdvertisementImages().subscribe(response => {
      console.log('advertisement', response);
      const resLength: any = response;
      switch(resLength.length) {
        case 0:{
          break;
        };
        default: {
          if ((response as any).data !== undefined) {
            this.advertisementImages = JSON.parse((response as any).data);
          } else {
            console.error('Response data is undefined');
          }
          break;
        };
      };
    });
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

  async updateAlert() {
    const alert = await this.alertCtrl.create({
      header: this.status.toUpperCase(),
      message: this.message,
      cssClass: 'alert-success',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.market.open('bt.ricb').then(data => {
              localStorage.setItem('updateStatus', 'Y');
            });
          }
        }
      ]
    });
    await alert.present();
  }

  async showToast() {
    const toast = await this.toastCtrl.create({
      message: this.message,
      duration: 3000,
      position: 'bottom',
      color: this.css
    });
    toast.onDidDismiss();
    toast.present();
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.value;
  }

}
