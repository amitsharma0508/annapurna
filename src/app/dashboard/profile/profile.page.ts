import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { DataService } from 'src/app/core/data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  loading: any;
  cidNo: any;
  users: any;

  status!: string;
  message!: string;
  css!: string;

  constructor(
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private dataService: DataService
  ) { }

  ngOnInit() {
    // this.cidNo = localStorage.getItem('cid');
    // this.getUserProfile();
  }

  getUserProfile() {
    this.presentLoading();
    this.dataService.getUserProfile(this.cidNo).subscribe(response => {
      console.log(response);
      this.users = JSON.parse((response as any).data);
      this.hideLoader();
    }, () => {
      this.status = 'Error';
      this.message = 'Error occurred while trying to fetch user profile';
      this.css = 'alert-error';
      this.presentAlert();
      this.hideLoader();
    });
  }

  presentLoading() {
    this.loading = this.loadingCtrl.create({
      message: 'Please wait, loading details',
      spinner: 'bubbles'
    }).then((res) => {
      res.present();
      res.onDidDismiss().then((dis) => { });
    });
  }

  hideLoader() {
    setTimeout(() => {
      this.loadingCtrl.dismiss();
    }, 2000);
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

  back() {
    this.navCtrl.navigateForward('/dashboard');
  }

}
