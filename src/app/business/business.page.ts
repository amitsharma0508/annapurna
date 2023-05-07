import { Component, OnInit } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { DataService } from '../core/data.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-business',
  templateUrl: './business.page.html',
  styleUrls: ['./business.page.scss'],
})
export class BusinessPage implements OnInit {
  loading: any;
  status!: string;
  css!: string;
  message!: string;
  detailsFlag: boolean = false;
  businessFlag: boolean = false;

  businessData!: [];

  constructor(
    private navCtrl: NavController,
    private callNumber: CallNumber,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private dataService: DataService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getLineOfBusinesses();
    this.hideLoader();
    this.businessFlag = true;
    this.detailsFlag = false;
  }

  //backButton
  back() {
    this.navCtrl.navigateForward('/dashboard');
  }

  //getLineOfBusiness Function
  getLineOfBusinesses(){
    // this.presentLoading();

    // this.dataService.getLineOfBusinesses().then(res => {
    //   let response = res.data;
    //   if(response === '') {
    //     this.status = 'Warning';
    //     this.message = 'No data available';
    //     this.css = 'alert-warning';
    //     this.presentAlert();
    //   } else {
    //     this.businessData = JSON.parse(response);
    //   }
    // }).catch(() => {
    //   this.status = 'Error';
    //   this.message = 'Failed to load details, please try again later';
    //   this.css = 'alert-error';
    //   this.presentAlert();
    // });
  }

  //getBusinessDetailsById function
  getBusinessDetailById(id:any, name:any){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        param: id,
        title: name
      }
    };
    this.router.navigate(['/business/business-detail'], navigationExtras);
  }

  //hide loader function
  hideLoader() {
    setTimeout(() => {
      this.loadingCtrl.dismiss();
    }, 2000);
  }

  //call function
  call(){
    this.callNumber.callNumber("1818", true)
    .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));
  }

  //show loading
  presentLoading() {
    this.loading = this.loadingCtrl.create({
      message: 'Please wait, loading details',
      spinner: 'bubbles'
    }).then((res) => {
      res.present();
      res.onDidDismiss().then((dis) => {});
    });
  }

  //show alert
  async presentAlert() {
    const alert = await this.alertCtrl.create({
    header: this.status.toUpperCase(),
    message: this.message,
    cssClass: this.css,
    buttons: ['OK']
  });
    await alert.present();
  }


}
