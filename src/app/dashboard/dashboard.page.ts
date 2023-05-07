import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, LoadingController, PopoverController } from '@ionic/angular';
import { PopoverPage } from '../component/popover/popover.page';
import { DataService } from '../core/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  loading: any;
  status!: string;
  message!: string;
  css!: string;
  cidNo!: string;
  policyNumbers!: [];
  policyNo: any;
  policys!: [];
  cid: any;
  HttpClient: any;
  option: any;
  remitterCID: any;

  constructor(
    private popoverController: PopoverController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private router: Router,
    private dataService: DataService,
    private http: HttpClient,
  ) { }

  ngOnInit() {
  }

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

  getCreditInvestment() {
          let navigationExtras: NavigationExtras = {
          queryParams: {
            param: "Credit/1",
            cid: this.cidNo,
            type: 'credit'
          }
        };
        this.router.navigate(['/dashboard/common'], navigationExtras);
    // this.presentLoading();
    // this.dataService.getCreditInvestment(this.cidNo).subscribe(response => {
    //   console.log(response);
    //   this.policyNumbers = (response as any).data;
    //   const res = JSON.parse((response as any).data);
    //   this.hideLoader();

    //   if (res.length === 0) {
    //     this.status = 'Warning';
    //     this.message = 'You dont have a credit account with RICB';
    //     this.css = 'alert-warning';
    //     this.presentAlert();
    //   } else {
    //     let navigationExtras: NavigationExtras = {
    //       queryParams: {
    //         param: this.policyNumbers,
    //         cid: this.cidNo,
    //         type: 'credit'
    //       }
    //     };
    //     this.router.navigate(['/dashboard/common'], navigationExtras);
    //   }
    // }, (error) => {
    //   this.status = 'Error';
    //   this.message = 'Problem occurred while fetching data. Please try again later';
    //   this.css = 'alert-error';
    //   this.presentAlert();
    //   this.hideLoader();
    // });
  }

  getLifeInsurance() {

    let navigationExtras: NavigationExtras = {
      queryParams: {
        param: "LIFE/1",
        cid: this.cidNo,
        type: 'life'
      }
    };
    this.router.navigate(['/dashboard/common'], navigationExtras);
    // this.presentLoading();

    // this.dataService.getLifeInsurance(this.cidNo).subscribe(response => {
    //   console.log(response);
    //   this.policyNumbers = (response as any).data;
    //   const res = JSON.parse((response as any).data);
    //   this.hideLoader();

    //   if (res.length === 0) {
    //     this.status = 'Warning';
    //     this.message = 'You dont have life insurance account with RICB';
    //     this.css = 'alert-warning';
    //     this.presentAlert();
    //   } else {
    //     let navigationExtras: NavigationExtras = {
    //       queryParams: {
    //         param: this.policyNumbers,
    //         cid: this.cidNo,
    //         type: 'life'
    //       }
    //     };
    //     this.router.navigate(['/dashboard/common'], navigationExtras);
    //   }
    // }, (error) => {
    //   this.status = 'Error';
    //   this.message = 'Problem occurred while fetching data. Please try again later';
    //   this.css = 'alert-error';
    //   this.presentAlert();
    //   this.hideLoader();
    // });
  }

  getGeneralInsurance() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        param: this.policyNumbers,
        cid: this.cidNo,
        type: 'general'
      }
    };
    this.router.navigate(['/dashboard/general-insurance-type'], navigationExtras);
  }

  getAnnuityScheme() {
      let navigationExtras: NavigationExtras = {
      queryParams: {
        param:"AnnuityScheme/1",
        cid: this.cidNo,
        type: 'defferedannuity'
      }
    };
    this.router.navigate(['/dashboard/common'], navigationExtras);
    // let navigationExtras: NavigationExtras = {
    //   queryParams: {
    //     param: this.policyNumbers,
    //     cid: this.cidNo,
    //     type: 'defferedannuity'
    //   }
    // };
    // this.router.navigate(['/dashboard/common'], navigationExtras);
  }

  payForOthers() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        param:"PayForOthers/1",
        cid: this.cidNo,
        type: 'payforothers'
      }
    };
    this.remitterCID = localStorage.getItem('cid');
    this.router.navigate(['/dashboard/common'], navigationExtras);
    // let navigationExtras: NavigationExtras = {
    //   queryParams: {
    //     param: this.policyNumbers,
    //     cid: this.cidNo,
    //     type: 'payforothers'
    //   }
    // };
    // this.remitterCID = localStorage.getItem('cid');
    // this.router.navigate(['/dashboard/common'], navigationExtras);
  }
  getRuralLife() {
    // this.router.navigate(['/dashboard/modal']);
    let navigationExtras: NavigationExtras = {
      queryParams: {
        cidNo: this.cidNo,
        policyNumbers: this.policyNumbers,
        payType: 'RuralSelf'
      }
    };
    this.router.navigate(['/dashboard/rural-life-detail-all'], navigationExtras);
  }

  getReports() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        param: "Report/1",
        cid: this.cidNo,
        type: 'report'
      }
    };
    this.router.navigate(['/dashboard/common'], navigationExtras);
    // let navigationExtras: NavigationExtras = {
    //   queryParams: {
    //     param: this.policyNumbers,
    //     cid: this.cidNo,
    //     type: 'report'
    //   }
    // };
    // this.router.navigate(['/dashboard/common'], navigationExtras);
  }

  claimtype() {
    this.router.navigate(['/dashboard/general-claim-type']);
  }

  trackClaim() {
    this.router.navigate(['/dashboard/track-general-claim']);
    // this.presentLoading();
    // this.dataService.trackGeneralclaims(this.cidNo).subscribe(res => {
    //   console.log(res);
    //   const response = JSON.parse((res as any).data);
    //   this.policys = JSON.parse((res as any).data);
    //   this.hideLoader();

    //   if (this.policys.length === 0) {
    //     this.status = 'Warning';
    //     this.message = 'No General Insurance Claims registered against your CID no.';
    //     this.css = 'alert-warning';
    //     this.presentAlert();
    //   } else {
    //     this.router.navigate(['/dashboard/track-general-claim']);
    //   }
    // }, (error) => {
    //   console.error(error);
    //   this.hideLoader();
    //   this.status = 'Error';
    //   this.message = 'Problem occurred while fetching data. Please try again later';
    //   this.css = 'alert-error';
    //   this.presentAlert();
    // });
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

}
