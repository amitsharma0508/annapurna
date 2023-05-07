import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController, LoadingController, NavController, PopoverController } from '@ionic/angular';
import { PopoverPage } from 'src/app/component/popover/popover.page';
import { DataService } from 'src/app/core/data.service';

@Component({
  selector: 'app-general-claim-type',
  templateUrl: './general-claim-type.page.html',
  styleUrls: ['./general-claim-type.page.scss'],
})
export class GeneralClaimTypePage implements OnInit {
  loading: any;
  status!: string;
  message!: string;
  css!: string;
  cidNo!: string;
  policyNumbers!: [];

  constructor(  private navCtrl: NavController,
    private popoverController: PopoverController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private route: ActivatedRoute,
    private dataService: DataService,
    private router: Router) { }

  ngOnInit() {
    // this.cidNo = localStorage.getItem('cid');
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

 //type 1 function
  type1() {
    let navigationExtras: NavigationExtras = {
    queryParams: {
      param: "Self OwnerShip",
      cid: this.cidNo,
      type: 'gclaim'
    }
  };
  this.router.navigate(['/dashboard/common'], navigationExtras);
    // this.presentLoading();
    // this.dataService.getGeneralclaims(this.cidNo).then(res => {
    //   console.log(res);
    //   this.policyNumbers = res.data;
    //   this.hideLoader();
    //   const response = JSON.parse(res.data);
    //   console.log(response);

    //   if(response.length === 0){
    //     this.status = 'Warning';
    //     this.message = 'No general insurance account available against your CID. Select Different Owner to process claim for others.';
    //     this.css = 'alert-warning';
    //     this.presentAlerta();
    //   } else {
    //     let navigationExtras: NavigationExtras = {
    //       queryParams: {
    //         param: this.policyNumbers,
    //         cid: this.cidNo,
    //         type: 'gclaim'
    //       }
    //     };
    //     this.router.navigate(['/dashboard/common'], navigationExtras);
    //   }
    // }).catch(error => {
    //   this.status = 'Error';
    //   this.message = 'Problem occurred while fetching data. Please try again later';
    //   this.css = 'alert-error';
    //   this.presentAlert();
    //   this.hideLoader();
    // });
  }
  //show present alert
  async presentAlert() {
    const alert = await this.alertCtrl.create({
    header: this.status.toUpperCase(),
    message: this.message,
    cssClass: this.css,
    buttons: [
      {
        text: 'OK'
      },

    ],
  });
    await alert.present();
  }

  //show present alert
  async presentAlerta() {
    const alert = await this.alertCtrl.create({
    header: this.status.toUpperCase(),
    message: this.message,
    cssClass: this.css,

    buttons: [
      {
        text: 'Yes',
        handler: () => {
           this.processClaim();
        }
      },
      {
        text: 'Cancel'
      }
    ],
  });
    await alert.present();

  }

  //process claim function
  processClaim(){
    sessionStorage.setItem('cid', this.cidNo);
    this.router.navigate(['/dashboard/general-claim-others']);
    this.hideLoader();
  }

  //process claimb
  processClaimb(){
    this.router.navigate(['/dashboard/general-claim-others']);
    this.hideLoader();
  }

  //type2 function
  type2() {
    // this.presentLoading();
    this.router.navigate(['/dashboard/general-claim-others']);
    this.hideLoader();
  }

  //show presentLoading
  presentLoading() {
    this.loading = this.loadingCtrl.create({
      message: 'Please wait, loading details',
      spinner: 'bubbles'
    }).then((res) => {
      res.present();
      res.onDidDismiss().then((dis) => {});
    });
  }

  //hide loader function
  hideLoader() {
    setTimeout(() => {
      this.loadingCtrl.dismiss();
    }, 2000);
  }



}
