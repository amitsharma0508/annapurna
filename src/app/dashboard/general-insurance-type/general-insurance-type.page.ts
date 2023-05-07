import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController, LoadingController, NavController, PopoverController } from '@ionic/angular';
import { PopoverPage } from 'src/app/component/popover/popover.page';
import { DataService } from 'src/app/core/data.service';

@Component({
  selector: 'app-general-insurance-type',
  templateUrl: './general-insurance-type.page.html',
  styleUrls: ['./general-insurance-type.page.scss'],
})
export class GeneralInsuranceTypePage implements OnInit {
  loading: any;
  status!: string;
  message!: string;
  css!: string;

  param!: string;

  policyNumbers!: [];
  policys!: [];
  cidNo!: string;
  policyType!: string;

  generalFlag = false;
  generalOthersFlag = false;
  remitterCid: any;


  emptyFlag = false;
  constructor(
    private route: ActivatedRoute,
    private popoverController: PopoverController,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private router: Router,
    private dataService: DataService
  ) { }

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

  //getGeneralInsurance
  getGeneralInsurance(test:any, test2:any) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        param:"generalInsurance/1",
        cid: this.cidNo,
        type: 'general'
      }
    };
    this.router.navigate(['/dashboard/common'], navigationExtras);
    // this.presentLoading();
    // this.dataService.getGeneralInsurance(this.cidNo).then(res => {
    //   console.log(res);
    //   this.policyNumbers = res.data;
    //   const response = JSON.parse(res.data);
    //   this.hideLoader();

    //   if(response.length === 0){
    //     this.status = 'Warning';
    //     this.message = 'You dont have general insurance account with RICB';
    //     this.css = 'alert-warning';
    //     this.presentAlert();
    //   } else {
    //     let navigationExtras: NavigationExtras = {
    //       queryParams: {
    //         param: this.policyNumbers,
    //         cid: this.cidNo,
    //         type: 'general'
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

  //present alert of OTIP
  async presentAlertOTIP() {
    const alert = await this.alertCtrl.create({
    header: this.status.toUpperCase(),
    message: this.message,
    cssClass: this.css,
    buttons: [
      {
        text: 'Ok',
        handler: () => {
           this.createNewCustomer();
        }
      },
      {
        text: 'Cancel'
      }
    ],
  });
    await alert.present();
  }

  //create new customer
  createNewCustomer(){
    sessionStorage.setItem('cid', this.cidNo);
    sessionStorage.setItem('remitterCid', this.cidNo);
    this.router.navigate(['/dashboard/create-new-customer']);
    this.hideLoader();
  }

  //policy details function
  policyDetails(type:any){
    if(type=='motorTp'){
      let navigationExtras: NavigationExtras = {
        queryParams: {
          param: "motorTP/1",
          cid: this.cidNo,
          type: 'motortprenew'
        }
      };
      this.router.navigate(['/dashboard/common'], navigationExtras);
    }
    else if(type==='otip'){
      let navigationExtras: NavigationExtras = {
      queryParams: {
      param: this.policyNumbers,
      cid: this.cidNo,
      remitterCid: this.cidNo,
      type: 'self'
      }
      };
      this.router.navigate(['/dashboard/overseas-travel-insurance'], navigationExtras);
    }else if(type==='mcp'){
      let navigationExtras: NavigationExtras = {
          queryParams: {
          param: "Motor Comprehensive Renewal",
          cid: this.cidNo,
          type: 'mcp'
          }
          };
          this.router.navigate(['/dashboard/common'], navigationExtras);
    }else if(type==='fire'){
      let navigationExtras: NavigationExtras = {
        queryParams: {
        param: "Standard Fire Renewal",
        cid: this.cidNo,
        type: 'fire'
        }
        };
        this.router.navigate(['/dashboard/common'], navigationExtras);
    }
    else if(type==='DTI'){
      // let navigationExtras: NavigationExtras = {
      //   queryParams: {
      //   param: "Standard Fire Renewal",
      //   cid: this.cidNo,
      //   type: 'fire'
      //   }
      //   };
        this.router.navigate(['/dashboard/domestic-travel-insurance']);
    }
    else if(type==='RHI'){
      // let navigationExtras: NavigationExtras = {
      //   queryParams: {
      //   param: "Standard Fire Renewal",
      //   cid: this.cidNo,
      //   type: 'fire'
      //   }
      //   };
        this.router.navigate(['/dashboard/rural-housing-insurance']);
    }
    else if(type==='nekor'){
      // let navigationExtras: NavigationExtras = {
      //   queryParams: {
      //   param: "Standard Fire Renewal",
      //   cid: this.cidNo,
      //   type: 'fire'
      //   }
      //   };
        this.router.navigate(['/dashboard/nekor']);
    }
    // if (type==='motorTp'){
    //     this.presentLoading();
    //     this.dataService.getMotorTpPolicy(this.cidNo).then(res => {
    //     console.log(res);
    //     this.policyNumbers = res.data;
    //     const response = JSON.parse(res.data);
    //     this.hideLoader();

    //     if(response.length === 0){
    //         this.status = 'Warning';
    //         this.message = 'You dont have Motor Third Party Policy due for renewal';
    //         this.css = 'alert-warning';
    //         this.presentAlert();
    //       } else {
    //         let navigationExtras: NavigationExtras = {
    //           queryParams: {
    //             param: this.policyNumbers,
    //             cid: this.cidNo,
    //             type: 'motortprenew'
    //           }
    //         };
    //         this.router.navigate(['/dashboard/common'], navigationExtras);
    //       }
    //     }).catch(error => {
    //       console.error(error);
    //       this.hideLoader();
    //       this.status = 'Error';
    //       this.message = 'Problem occurred while fetching data. Please try again later';
    //       this.css = 'alert-error';
    //       this.presentAlert();
    //     });
    //   }
    //     else if(type==='otip'){
    //     this.presentLoading();
    //     this.dataService.getOtipCustomerDetail(this.cidNo).then(response => {
    //       console.log(response);
    //       this.policyNumbers = response.data;
    //       const res = JSON.parse(response.data);
    //       this.hideLoader();

    //       if(res.length === 0){
    //         this.status = 'Warning';
    //         this.message = 'RICB could not find customer data against your CID no. Please click OK to create new customer Profile with RICB';
    //         this.css = 'alert-warning';
    //         this.presentAlertOTIP();
    //       } else {
    //         let navigationExtras: NavigationExtras = {
    //           queryParams: {
    //             param: this.policyNumbers,
    //             cid: this.cidNo,
    //             remitterCid: this.cidNo,
    //             type: 'self'
    //           }
    //         };
    //         this.router.navigate(['/dashboard/overseas-travel-insurance'], navigationExtras);
    //       }
    //     }).catch(error => {
    //       console.error(error);
    //       this.hideLoader();
    //       this.status = 'Error';
    //       this.message = 'Problem occurred while fetching data. Please try again later';
    //       this.css = 'alert-error';
    //       this.presentAlert();
    //     });
    //   }else if (type==='mcp'){
    //     this.presentLoading();
    //     this.dataService.getMotorCPPolicy(this.cidNo).then(res => {
    //     console.log(res);
    //     this.policyNumbers = res.data;
    //     const response = JSON.parse(res.data);
    //     this.hideLoader();

    //     if(response.length === 0){
    //         this.status = 'Warning';
    //         this.message = 'You dont have Motor Comprehensive Policy with RICB';
    //         this.css = 'alert-warning';
    //         this.presentAlert();
    //       } else {
    //         let navigationExtras: NavigationExtras = {
    //           queryParams: {
    //             param: this.policyNumbers,
    //             cid: this.cidNo,
    //             type: 'mcp'
    //           }
    //         };
    //         this.router.navigate(['/dashboard/common'], navigationExtras);
    //       }
    //     }).catch(error => {
    //       console.error(error);
    //       this.hideLoader();
    //       this.status = 'Error';
    //       this.message = 'Problem occurred while fetching data. Please try again later';
    //       this.css = 'alert-error';
    //       this.presentAlert();
    //     });
    //   }else if (type==='fire'){
    //     this.presentLoading();
    //     this.dataService.getFireSFPolicy(this.cidNo).then(res => {
    //     console.log(res);
    //     this.policyNumbers = res.data;
    //     const response = JSON.parse(res.data);
    //     this.hideLoader();

    //     if(response.length === 0){
    //         this.status = 'Warning';
    //         this.message = 'You dont have Standard Fire Policy with RICB';
    //         this.css = 'alert-warning';
    //         this.presentAlert();
    //       } else {
    //         let navigationExtras: NavigationExtras = {
    //           queryParams: {
    //             param: this.policyNumbers,
    //             cid: this.cidNo,
    //             type: 'fire'
    //           }
    //         };
    //         this.router.navigate(['/dashboard/common'], navigationExtras);
    //       }
    //     }).catch(error => {
    //       console.error(error);
    //       this.hideLoader();
    //       this.status = 'Error';
    //       this.message = 'Problem occurred while fetching data. Please try again later';
    //       this.css = 'alert-error';
    //       this.presentAlert();
    //     });
    //   }

    }
}
