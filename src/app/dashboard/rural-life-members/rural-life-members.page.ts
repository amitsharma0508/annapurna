import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, LoadingController, ModalController, NavController, NavParams } from '@ionic/angular';
import { DataService } from 'src/app/core/data.service';

@Component({
  selector: 'app-rural-life-members',
  templateUrl: './rural-life-members.page.html',
  styleUrls: ['./rural-life-members.page.scss'],
})
export class RuralLifeMembersPage implements OnInit {
  cidNo!: number;
  status!: string;
  message!: string;
  css!: string;
  loading: any;
  members: any;
  memCIDNo: any;
  memName: any;
  uwYear: any;

  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    private dataService: DataService,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private router: Router,
  ) { }

  ngOnInit() {
    console.table(this.navParams);
    this.cidNo = this.navParams.data['cidNo'];
    this.uwYear = this.navParams.data['uwYear'];
    this.getMemberList();
  }

  //closing the model function
  async closeModal() {
    const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss(onClosedData);
  }

  //getMemberList
  getMemberList(){
    // this.presentLoading();
    // this.dataService.getRuralMember(this.cidNo,this.uwYear).then(res => {
    //   const response = JSON.parse(res.data);
    //   this.members = JSON.parse(res.data);
    //   this.hideLoader();
    //   console.log(response);

    //   if(this.members.length > 0){
    //     this.memCIDNo = response[0].CITIZEN_ID;
    //     this.memName = response[0].MEMBER_NAME;
    //   }
    // }).catch(() => {
    //   this.status = 'Error';
    //   this.message = 'Problem occured while fetching data. Please check your internet connection and try again';
    //   this.css = 'alert-error';
    //   this.presentAlert();

    // });
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

  //hide loader
  hideLoader() {
    setTimeout(() => {
      this.loadingCtrl.dismiss();
    }, 2000);
  }

  //back button
  back() {
    //this.navCtrl.navigateForward('/dashboard');
    let navigationExtras: NavigationExtras = {
      queryParams: {
        param: this.members,
        cid: this.cidNo,
      }
    };
    this.router.navigate(['/dashboard/rural-life-detail-all'], navigationExtras);
  }

}
