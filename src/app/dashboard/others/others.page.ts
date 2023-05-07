import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController, LoadingController, NavController, PopoverController } from '@ionic/angular';
import { DataService } from 'src/app/core/data.service';
import { DatePipe } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { REPORT_URL } from 'src/app/app.constants';
import { PopoverPage } from 'src/app/component/popover/popover.page';
// import { PDFGenerator } from '@ionic-native/pdf-generator/ngx';

@Component({
  selector: 'app-others',
  templateUrl: './others.page.html',
  styleUrls: ['./others.page.scss'],
})
export class OthersPage implements OnInit {

  type!: string;
  remitterCid!: string;

  creditFlag = false;
  creditTitle = false;
  lifeFlag = false;
  lifeTitle = false;
  deferredFlag = false;
  deferredTitle = false;
  ruralLifeFlag= false;
  rurallifeTitle= false;
  generalFlag= false;
  generalTitle= false;
  otipFlag= false;
  otipTitle= false;
  mcpFlag= false;
  mcpTitle= false;
  fireFlag= false;
  fireTitle= false;

  policyNumbers!: [];
  proCID:any;

  mtpOthersFlag= false;
  otipOthersFlag= false;

  othersReportFlag = false;

  status!: string;
  message!: string;
  css!: string;
  loading: any;
  cidNo!: string;
  polNo:any;
  policys: any;
  product:any;
  monthsDiff:any;
  polStatus:any;
  polExpiry:any;

  accountNo!: number;
  uwYear : any = (new Date()).getFullYear() + 1;
  othersCID:any;
  mCID:any;
  cCID:any;
  fCID:any;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private popoverController: PopoverController,
    private router: Router,
    private dataService: DataService,
    // private pdfGenerator:PDFGenerator
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.type = params['param'];
      this.cidNo = params['cid'];
      this.remitterCid = params['remitterCid'];
    });
    console.log('cidNo',this.cidNo);
    console.log('remitterCid',this.remitterCid);
    console.log('type',this.type);

    if(this.type === 'credit'){
      this.creditFlag = true;
      this.creditTitle = true;
    } else if(this.type === 'life'){
      this.lifeFlag = true;
      this.lifeTitle = true;
    } else if(this.type === 'deferred'){
      this.deferredFlag = true;
      this.deferredTitle = true;
    }
    else if(this.type === 'ruralLife'){
      this.ruralLifeFlag = true;
      this.rurallifeTitle = true;
    } else if(this.type === 'general'){
      this.generalFlag = true;
      this.generalTitle = true;
    } else if(this.type === 'otip'){
      this.otipFlag = true;
      this.otipTitle = true;
    } else if(this.type === 'othersReport'){
      this.othersReportFlag = true;
      this.generalTitle = true;
    } else if(this.type === 'mcp'){
      this.mcpFlag = true;
      this.mcpTitle = true;
    } else if(this.type === 'fire'){
      this.fireFlag = true;
      this.fireTitle = true;
    }
  }

    //backButton
    back() {
      let navigationExtras: NavigationExtras = {
        queryParams: {
          param: '',
          cid: '',
          type: 'payforothers'
        }
      };
      this.router.navigate(['/dashboard/common'], navigationExtras);
    }

    //popOver
    async openPopover(ev: any) {
      const popover = await this.popoverController.create({
        component: PopoverPage,
        event: ev,
        translucent: true,
        mode: 'ios',
        showBackdrop: false,
      });
      return await popover.present();
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

    //hide loader
    hideLoader() {
      setTimeout(() => {
        this.loadingCtrl.dismiss();
      }, 2000);
    }

    //policyDetails
    policyDetails(type:any){
      if(type=='credit'){
        let navigationExtras: NavigationExtras = {
        queryParams: {
          param: this.accountNo,
          payType: 'others',
          remitterCid: this.remitterCid
        }
      };
      this.router.navigate(['/dashboard/credit-detail'], navigationExtras);
      }
      if(type=='life'){
        let navigationExtras: NavigationExtras = {
        queryParams: {
          param: this.accountNo,
          remitterCid: this.remitterCid
        }
      };
      this.router.navigate(['/dashboard/life-detail'], navigationExtras);
      }
      if(type=='deferred'){
        let navigationExtras: NavigationExtras = {
        queryParams: {
          param: this.accountNo,
          remitterCid: this.remitterCid
        }
      };
      this.router.navigate(['/dashboard/deferred-detail'], navigationExtras);
      }
      if(type=='ruralLife'){
        let navigationExtras: NavigationExtras = {
        queryParams: {
          param: this.cidNo,
          cidNo: this.cidNo,
          remitterCid: this.remitterCid,
          payType: 'RuralOthers'
        }
      };
      this.router.navigate(['/dashboard/rural-life-detail-all'], navigationExtras);
      }
      if(type=='otip'){
        let navigationExtras: NavigationExtras = {
        queryParams: {
          param: this.policyNumbers,
          cid: this.proCID,
          remitterCid: this.remitterCid,
          type: 'others'
        }
      };
      this.router.navigate(['/dashboard/overseas-travel-insurance'], navigationExtras);
      }
      if(type=='general'){
        let navigationExtras: NavigationExtras = {
        queryParams: {
          param: this.policyNumbers,
          cid: this.mCID,
          remitterCid: this.remitterCid,
          type: 'mtp'
        }
      };
      this.router.navigate(['/dashboard/general-renewal-others'], navigationExtras);
      }
      if(type=='mcp'){
        let navigationExtras: NavigationExtras = {
        queryParams: {
          param: this.policyNumbers,
          cid: this.mCID,
          remitterCid: this.remitterCid,
          type: 'mcp'
        }
      };
      this.router.navigate(['/dashboard/general-renewal-others'], navigationExtras);
      }
      if(type=='fire'){
        let navigationExtras: NavigationExtras = {
        queryParams: {
          param: this.policyNumbers,
          cid: this.mCID,
          remitterCid: this.remitterCid,
          type: 'fire'
        }
      };
      this.router.navigate(['/dashboard/general-renewal-others'], navigationExtras);
      }
      if(type=='othersReport'){
        let navigationExtras: NavigationExtras = {
        queryParams: {
          param: "othersREport",
          cid: this.cidNo,
          type: 'selfReport'
        }
      };
      this.router.navigate(['/dashboard/report-details'], navigationExtras);
      }
      // if(type === 'credit'){
      //   this.dataService.getCreditInvestmentDetails(this.accountNo).then(res => {
      //     console.log(res);
      //     const response = JSON.parse(res.data);
      //     console.log(response);
      //     if(response.length === 0){
      //       this.status = 'Warning';
      //       this.message = 'The loan account does not exist';
      //       this.css = 'alert-warning';
      //       this.presentAlert();
      //     } else if(response[0].CID_NO === this.remitterCid){
      //       this.status = 'Warning';
      //       this.message = 'Sorry, cannot process for your own loan account';
      //       this.css = 'alert-warning';
      //       this.presentAlert();
      //     } else {
      //       let navigationExtras: NavigationExtras = {
      //         queryParams: {
      //           param: this.accountNo,
      //           payType: 'others',
      //           remitterCid: this.remitterCid
      //         }
      //       };
      //       this.router.navigate(['/dashboard/credit-detail'], navigationExtras);
      //     }
      //   }).catch(() => {
      //     this.status = 'Error';
      //     this.message = 'Problem occurred during fetching data from server, please try again later';
      //     this.css = 'alert-error';
      //     this.presentAlert();
      //   });
      // } else if(type === 'life'){
      //   this.dataService.getLifeInsuranceDetails(this.accountNo).then(res => {
      //     console.log(res);
      //     const response = JSON.parse(res.data);
      //     console.log(response);
      //     if(response.length === 0){
      //       this.status = 'Warning';
      //       this.message = 'The policy number does not exist';
      //       this.css = 'alert-warning';
      //       this.presentAlert();
      //     } else if(response[0].CUST_CID === this.remitterCid){
      //       this.status = 'Warning';
      //       this.message = 'Sorry, cannot process for your own policy number';
      //       this.css = 'alert-warning';
      //       this.presentAlert();
      //     } else {
      //       let navigationExtras: NavigationExtras = {
      //         queryParams: {
      //           param: this.accountNo,
      //           remitterCid: this.remitterCid
      //         }
      //       };
      //       this.router.navigate(['/dashboard/life-detail'], navigationExtras);
      //     }
      //   }).catch(() => {
      //     this.status = 'Error';
      //     this.message = 'Problem occurred during fetching data from server, please try again later';
      //     this.css = 'alert-error';
      //     this.presentAlert();
      //   });
      // } else if(type === 'general'){
      //   this.presentLoading();
      //   this.dataService.getMotorTpPolicy(this.mCID).then(res => {
      //   console.log(res);
      //   this.policyNumbers = res.data;
      //   const response = JSON.parse(res.data);
      //   this.hideLoader();

      //   if(response.length === 0){
      //       this.status = 'Warning';
      //       this.message = 'You dont have Motor Third Party Policy due for renewal';
      //       this.css = 'alert-warning';
      //       this.presentAlert();
      //     } else {
      //       let navigationExtras: NavigationExtras = {
      //         queryParams: {
      //           param: this.policyNumbers,
      //           cid: this.mCID,
      //           remitterCid: this.remitterCid,
      //           type: 'mtp'
      //         }
      //       };
      //       this.router.navigate(['/dashboard/general-renewal-others'], navigationExtras);
      //     }
      //   }).catch(error => {
      //     console.error(error);
      //     this.hideLoader();
      //     this.status = 'Error';
      //     this.message = 'Problem occurred while fetching data. Please try again later';
      //     this.css = 'alert-error';
      //     this.presentAlert();
      //   });
      // }else if(type === 'deferred'){
      //   this.dataService.getDeferredAnnuityDetails(this.accountNo).then(res => {
      //     console.log(res);
      //     const response = JSON.parse(res.data);
      //     console.log(response);
      //     if(response.length === 0){
      //       this.status = 'Warning';
      //       this.message = 'The policy number does not exist';
      //       this.css = 'alert-warning';
      //       this.presentAlert();
      //     } else if(response[0].CITYZENSHIPID === this.remitterCid){
      //       this.status = 'Warning';
      //       this.message = 'Sorry, cannot process for your own policy number';
      //       this.css = 'alert-warning';
      //       this.presentAlert();
      //     } else {
      //       let navigationExtras: NavigationExtras = {
      //         queryParams: {
      //           param: this.accountNo,
      //           remitterCid: this.remitterCid
      //         }
      //       };
      //       this.router.navigate(['/dashboard/deferred-detail'], navigationExtras);
      //     }
      //   }).catch(() => {
      //     this.status = 'Error';
      //     this.message = 'Problem occurred during fetching data from server, please try again later';
      //     this.css = 'alert-error';
      //     this.presentAlert();
      //   });
      // }
      // else if(type === 'deferred'){
      //   this.dataService.getDeferredAnnuityDetails(this.accountNo).then(res => {
      //     console.log(res);
      //     const response = JSON.parse(res.data);
      //     console.log(response);
      //     if(response.length === 0){
      //       this.status = 'Warning';
      //       this.message = 'The policy number does not exist';
      //       this.css = 'alert-warning';
      //       this.presentAlert();
      //     } else if(response[0].CITYZENSHIPID === this.remitterCid){
      //       this.status = 'Warning';
      //       this.message = 'Sorry, cannot process for your own policy number';
      //       this.css = 'alert-warning';
      //       this.presentAlert();
      //     } else {
      //       let navigationExtras: NavigationExtras = {
      //         queryParams: {
      //           param: this.accountNo,
      //           remitterCid: this.remitterCid
      //         }
      //       };
      //       this.router.navigate(['/dashboard/deferred-detail'], navigationExtras);
      //     }
      //   }).catch(() => {
      //     this.status = 'Error';
      //     this.message = 'Problem occurred during fetching data from server, please try again later';
      //     this.css = 'alert-error';
      //     this.presentAlert();
      //   });
      // }else if(type === 'ruralLife'){
      //   console.log(this.uwYear);
      //   this.dataService.getRuralDtl(this.cidNo,this.uwYear).then(res => {
      //     console.log(res);
      //     const response = JSON.parse(res.data);
      //     console.log(response);
      //     if(response.length === 0){
      //       this.status = 'Warning';
      //       this.message = 'Rural Life Insurance data does not exist';
      //       this.css = 'alert-warning';
      //       this.presentAlert();
      //     } else {
      //       let navigationExtras: NavigationExtras = {
      //         queryParams: {
      //           param: this.cidNo,
      //           cidNo: this.cidNo,
      //           remitterCid: this.remitterCid,
      //           payType: 'RuralOthers'
      //         }
      //       };
      //       this.router.navigate(['/dashboard/rural-life-detail-all'], navigationExtras);
      //     }
      //   }).catch(() => {
      //     this.status = 'Error';
      //     this.message = 'Problem occurred during fetching data from server, please try again later';
      //     this.css = 'alert-error';
      //     this.presentAlert();
      //   });
      // }else if(type === 'otip'){
      //   this.presentLoading();
      //   this.dataService.getOtipCustomerDetail(this.proCID).then(response => {
      //     console.log(response);
      //     this.policyNumbers = response.data;
      //     const res = JSON.parse(response.data);
      //     this.hideLoader();

      //     if(res.length === 0){
      //       this.status = 'Warning';
      //       this.message = 'RICB could not find customer data against your CID no. Please click OK to create new customer Profile with RICB';
      //       this.css = 'alert-warning';
      //       this.presentAlertOTIP();
      //     } else {
      //       let navigationExtras: NavigationExtras = {
      //         queryParams: {
      //           param: this.policyNumbers,
      //           cid: this.proCID,
      //           remitterCid: this.remitterCid,
      //           type: 'others'
      //         }
      //       };
      //       this.router.navigate(['/dashboard/overseas-travel-insurance'], navigationExtras);
      //     }
      //   }).catch(error => {
      //     console.error(error);
      //     this.hideLoader();
      //     this.status = 'Error';
      //     this.message = 'Problem occurred while fetching data. Please try again later';
      //     this.css = 'alert-error';
      //     this.presentAlert();
      //   });
      // } else if(type === 'othersReport'){
      //   this.presentLoading();
      //     this.dataService.getGeneralActivePolicy(this.othersCID).then(response => {
      //     console.log(response);
      //     this.policyNumbers = response.data;
      //     const res = JSON.parse(response.data);
      //     this.hideLoader();

      //     if(res.length === 0){
      //       this.status = 'Warning';
      //       this.message = 'You dont have active policy with RICB';
      //       this.css = 'alert-warning';
      //       this.presentAlert();
      //     } else {
      //       let navigationExtras: NavigationExtras = {
      //         queryParams: {
      //           param: this.policyNumbers,
      //           cid: this.cidNo,
      //           type: 'selfReport'
      //         }
      //       };
      //       this.router.navigate(['/dashboard/report-details'], navigationExtras);
      //     }
      //   }).catch(error => {
      //     console.error(error);
      //     this.hideLoader();
      //     this.status = 'Error';
      //     this.message = 'Problem occurred while fetching data. Please try again later';
      //     this.css = 'alert-error';
      //     this.presentAlert();
      //   });
      //   }else if(type === 'mcp'){
      //     this.presentLoading();
      //     this.dataService.getMotorCPPolicy(this.cCID).then(res => {
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
      //             cid: this.mCID,
      //             remitterCid: this.remitterCid,
      //             type: 'mcp'
      //           }
      //         };
      //         this.router.navigate(['/dashboard/general-renewal-others'], navigationExtras);
      //       }
      //     }).catch(error => {
      //       console.error(error);
      //       this.hideLoader();
      //       this.status = 'Error';
      //       this.message = 'Problem occurred while fetching data. Please try again later';
      //       this.css = 'alert-error';
      //       this.presentAlert();
      //     });
      //   }else if(type === 'fire'){
      //     this.presentLoading();
      //     this.dataService.getFireSFPolicy(this.fCID).then(res => {
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
      //             cid: this.mCID,
      //             remitterCid: this.remitterCid,
      //             type: 'fire'
      //           }
      //         };
      //         this.router.navigate(['/dashboard/general-renewal-others'], navigationExtras);
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

      //presentAlertOTIP
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

      //createNewCustomer
      createNewCustomer(){
        sessionStorage.setItem('cid', this.proCID);
        sessionStorage.setItem('remitterCid', this.remitterCid);
        this.router.navigate(['/dashboard/create-new-customer-others']);
        this.hideLoader();
      }


}
