import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController, LoadingController, NavController, PopoverController } from '@ionic/angular';
import { PopoverPage } from 'src/app/component/popover/popover.page';
import { DataService } from 'src/app/core/data.service';

@Component({
  selector: 'app-immediate-detail',
  templateUrl: './immediate-detail.page.html',
  styleUrls: ['./immediate-detail.page.scss'],
})
export class ImmediateDetailPage implements OnInit {
  status!: string;
  message!: string;
  css!: string;
  loading: any;

  policyNumbers!: [];
  policyNo!: string;
  cidNo!: string;
  policys: any;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private popoverController: PopoverController,
    private dataService: DataService,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.policyNo = params['param'];
      this.cidNo = params['cidNo'];
      this.policyNumbers = params['policyNumbers'];
    });
    console.log(this.policyNumbers);
    this.getImmediateAnnuityDetails();
  }

    //backButton
    back() {
      this.navCtrl.navigateForward('/dashboard');
    }

    //popOver
    async openPopover(ev: any) {
      const popover = await this.popoverController.create({
        component: PopoverPage,
        event: ev,
        translucent: true,
        mode: 'ios',
        showBackdrop: false
      });
      return await popover.present();
    }

    //loader shown
    presentLoading() {
      this.loading = this.loadingCtrl.create({
        message: 'Please wait, loading details',
        spinner: 'bubbles'
      }).then((res) => {
        res.present();
        res.onDidDismiss().then((dis) => {});
      });
    }

    //loader hidden
    hideLoader() {
      setTimeout(() => {
        this.loadingCtrl.dismiss();
      }, 2000);
    }

    //alert function
    async presentAlert() {
      const alert = await this.alertCtrl.create({
      header: this.status.toUpperCase(),
      message: this.message,
      cssClass: this.css,
      buttons: ['OK']
    });
      await alert.present();
    }

    //getImmediateAnnuityDetails
    getImmediateAnnuityDetails(){
      // this.presentLoading();
      // this.dataService.getImmediateAnnuityDetails(this.policyNo).then(res => {
      //   console.log(res);
      //   this.policys = JSON.parse(res.data);
      //   this.hideLoader();
      // }).catch(() => {
      //   this.status = 'Error';
      //   this.message = 'Problem occured while fetching data. Please check your internet connection and try again';
      //   this.css = 'alert-error';
      //   this.presentAlert();
      //   this.hideLoader();
      // });
    }


}
