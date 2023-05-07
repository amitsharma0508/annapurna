import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController, LoadingController, NavController, PopoverController } from '@ionic/angular';
import { PopoverPage } from 'src/app/component/popover/popover.page';
import { DataService } from 'src/app/core/data.service';

@Component({
  selector: 'app-common',
  templateUrl: './common.page.html',
  styleUrls: ['./common.page.scss'],
})
export class CommonPage implements OnInit {

  loading: any;
  status!: string;
  message!: string;
  css!: string;

  param!: string;

  policyNumbers!: [];
  policys!: [];
  cidNo!: string;
  policyType!: string;

  creditFlag = false;
  creditTitle = false;
  lifeFlag = false;
  generalclaimFlag = false;
  policyTitle = false;
  generalFlag = false;
  deferredFlag = false;
  othersFlag = false;
  payothersTitle = false;
  reportFlag = false;
  reportTitle = false;
  loanReportFlag = false;
  gisReportFlag = false;
  ppfReportFlag = false;
  tClaimsFlag = false;
  tClaimsTitle = false;
  rurallifeFlag=false;
  rurallifeTitle=false;
  motorTpFlag=false;
  mcpFlag=false;
  fireFlag=false;
  motorTpTitle=false;
  mtpDocFlag =false;
  otipDocFlag =false;
  pdfViewFlag = false;

  emptyFlag = false;
  pdfSrc!: SafeResourceUrl;
  htmlSample: any;
  remitterCID:any;

  constructor(
    private route: ActivatedRoute,
    private popoverController: PopoverController,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private router: Router,
    private dataService: DataService,
    public sanitizer: DomSanitizer,
    // private pdfGenerator:PDFGenerator
  ) {  }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm(){
  //   this.creditFlag = false;
  //   this.lifeFlag = false;
  //   this.generalFlag = false;
  //   this.generalclaimFlag = false;
  //   this.deferredFlag = false;
  //   this.othersFlag = false;
  //   this.reportFlag = false;
  //   this.tClaimsFlag = false;
  //   this.rurallifeFlag= false;
  //   this.motorTpFlag= false;
  //   this.mtpDocFlag = false;
  //   this.otipDocFlag= false;
  //   this.otipDocFlag = false;
  //   this.mcpFlag= false;
  //   this.fireFlag= false;

    this.route.queryParams.subscribe(params => {
      this.param = params['param'];
      this.cidNo = params['cid'];
      this.policyType = params['type'];
      this.remitterCID=params['remitterCID'];
    });

    if(this.policyType === 'credit'){
      this.creditFlag = true;
      this.creditTitle = true;
    }
    if(this.policyType === 'life'){
      this.lifeFlag = true;
      this.policyTitle = true;
    }
    if(this.policyType == "defferedannuity"){
      this.deferredFlag = true;
      this.policyTitle = true;
    }
    if(this.policyType == "payforothers"){
      this.othersFlag = true;
      this.payothersTitle = true;
    }
    if(this.policyType == "report"){
      this.reportFlag = true;
      this.reportTitle = true;
    }
    if(this.policyType == "general"){
      this.generalFlag = true;
      this.policyTitle = true;
    }
    if(this.policyType == "motortprenew"){
      this.motorTpFlag = true;
      this.policyTitle = true;
    }
    if(this.policyType == "mcp"){
      this.mcpFlag = true;
      this.policyTitle = true;
    }
    if(this.policyType == "fire"){
      this.fireFlag = true;
      this.policyTitle = true;
    }
    if(this.policyType == "gclaim"){
      this.generalclaimFlag = true;
      this.policyTitle = true;
    }


  //   if(this.param !== undefined){
  //     this.policyNumbers = JSON.parse(this.param);
  //   }

  //   console.log(this.policyNumbers);
  //   console.log('cid',this.cidNo);
  //   console.log(this.policyType);
  //   console.log('remCID',this.remitterCID);

  //   if(this.policyType == "defferedannuity"){
  //     this.deferredFlag = true;
  //     this.policyTitle = true;
  //   } else if(this.policyType == "payforothers"){
  //     this.othersFlag = true;
  //     this.payothersTitle = true;
  //   } else if(this.policyType == "report"){
  //     this.reportFlag = true;
  //     this.reportTitle = true;
  //   } else if(this.policyType == "tClaims"){
  //     this.tClaimsFlag = true;
  //     this.tClaimsTitle = true;
  //   } else {
  //     if(this.policyNumbers.length === 0) {
  //       this.emptyFlag = true;
  //     } else {
  //       if(this.policyType === 'credit'){
  //         this.creditFlag = true;
  //         this.creditTitle = true;
  //       } if(this.policyType === 'life'){
  //         this.lifeFlag = true;
  //         this.policyTitle = true;
  //       } if(this.policyType == "general"){
  //         this.generalFlag = true;
  //         this.policyTitle = true;
  //       }
  //       if(this.policyType == "payrurallife"){
  //         this.rurallifeFlag = true;
  //         this.rurallifeTitle = true;
  //       }
  //       if(this.policyType == "gclaim"){
  //         this.generalclaimFlag = true;
  //         this.policyTitle = true;
  //       }
  //       if(this.policyType == "motortprenew"){
  //         this.motorTpFlag = true;
  //         this.policyTitle = true;
  //       }
  //       if(this.policyType == "mcp"){
  //         this.mcpFlag = true;
  //         this.policyTitle = true;
  //       }
  //       if(this.policyType == "fire"){
  //         this.fireFlag = true;
  //         this.policyTitle = true;
  //       }
  //     }
  //   }
  }

  policyDetails(policyNo: string, type: string){
    if(type === 'credit'){
      let navigationExtras: NavigationExtras = {
        queryParams: {
          param: policyNo,
          payType: type,
          remitterCid: this.cidNo
        }
      };
      this.router.navigate(['/dashboard/credit-detail'], navigationExtras);
    }
      if(type === 'life'){
      let navigationExtras: NavigationExtras = {
        queryParams: {
          param: policyNo,
          remitterCid: this.cidNo
        }
      };
      this.router.navigate(['/dashboard/life-detail'], navigationExtras);
    }
      if(type === 'general'){
      let navigationExtras: NavigationExtras = {
        queryParams: {
          param: policyNo,
          remitterCid: this.cidNo
        }
      };
      this.router.navigate(['/dashboard/general-detail'], navigationExtras);
    }
    if(type === 'motortprenew'){
      let navigationExtras: NavigationExtras = {
        queryParams: {
          param: policyNo,
          remitterCid: this.cidNo
        }
      };
      this.router.navigate(['/dashboard/motor-tp-renewal-detail'], navigationExtras);
    }
    if(type === 'mcp'){
      let navigationExtras: NavigationExtras = {
        queryParams: {
          param: policyNo,
          remitterCid: this.cidNo
        }
      };
      this.router.navigate(['/dashboard/motor-cp-renewal'], navigationExtras);
    }
    if(type === 'fire'){
      let navigationExtras: NavigationExtras = {
        queryParams: {
          param: policyNo,
          remitterCid: this.cidNo
        }
      };
      this.router.navigate(['/dashboard/fire-sf-renewal'], navigationExtras);
    }
     if(type === 'gclaim'){
      let navigationExtras: NavigationExtras = {
        queryParams: {
          param: policyNo,
          remitterCid: this.cidNo
        }
      };
      sessionStorage.setItem('policyNo', policyNo);
      this.router.navigate(['/dashboard/general-claim'], navigationExtras);
    }
    //
    if(type === 'immediate'){
      let navigationExtras: NavigationExtras = {
      queryParams: {
        param: 87654,
        cid: this.cidNo,
        type: 'immediatepolicyno'
      }
    };
    this.router.navigate(['/dashboard/annuity-scheme-details'], navigationExtras);
    }
    if(type === 'deferred'){
      let navigationExtras: NavigationExtras = {
      queryParams: {
        param: this.policyNumbers,
        cid: this.cidNo,
        type: 'defferedpolicyno'
      }
    };
    this.router.navigate(['/dashboard/annuity-scheme-details'], navigationExtras);
    }
    if(type === 'creditOthers'){
      let navigationExtras: NavigationExtras = {
        queryParams: {
          param: 'credit',
          remitterCid: this.cidNo,
        }
      };
      this.router.navigate(['/dashboard/others'], navigationExtras);
    } if(type === 'lifeOthers'){
      let navigationExtras: NavigationExtras = {
        queryParams: {
          param: 'life',
          remitterCid: this.cidNo,
        }
      };
      this.router.navigate(['/dashboard/others'], navigationExtras);
    } if(type === 'generalOthers'){
      let navigationExtras: NavigationExtras = {
        queryParams: {
          param: this.policyNumbers,
          type: 'generalOthers',
          remitterCid:this.cidNo
        }
      };
      this.router.navigate(['/dashboard/general-insurance-type-others'], navigationExtras);
    } if(type === 'deferredOthers'){
      let navigationExtras: NavigationExtras = {
        queryParams: {
          param: 'deferred',
          remitterCid: this.cidNo,
        }
      };
      this.router.navigate(['/dashboard/others'], navigationExtras);
    } if(type === 'ruralLifeOthers'){
      let navigationExtras: NavigationExtras = {
        queryParams: {
          param: 'ruralLife',
          remitterCid: this.cidNo,
        }
      };
      this.router.navigate(['/dashboard/others'], navigationExtras);
    }
    if(type === 'loanReport'){
      let navigationExtras: NavigationExtras = {
      queryParams: {
        param: "LoanReport/1",
        cid: this.cidNo,
        type: 'loanReport'
      }
    };
    this.router.navigate(['/dashboard/report-details'], navigationExtras);
    }
    if(type === 'ppfReport'){
      let navigationExtras: NavigationExtras = {
      queryParams: {
        param: "ppfReport/1",
        cid: this.cidNo,
        type: 'ppfReport'
      }
    };
    this.router.navigate(['/dashboard/report-details'], navigationExtras);
    }
    if(type === 'gisReport'){
      let navigationExtras: NavigationExtras = {
      queryParams: {
        param: this.policyNumbers,
        cid: this.cidNo,
        type: 'gisReport'
      }
    };
    this.router.navigate(['/dashboard/report-details'], navigationExtras);
    }
    if(type === 'giReport'){
      let navigationExtras: NavigationExtras = {
      queryParams: {
        param: this.policyNumbers,
        cid: this.cidNo,
        type: 'giReport'
      }
    };
    this.router.navigate(['/dashboard/general-insurance-document'], navigationExtras);
    }
  //   if(type === 'immediate'){
  //     this.presentLoading();
  //     this.dataService.getImmediateAnnuity(this.cidNo).then(response => {
  //       console.log(response);
  //       this.policyNumbers = response.data;
  //       const res = JSON.parse(response.data);
  //       this.hideLoader();

  //       if(res.length === 0){
  //         this.status = 'Warning';
  //         this.message = 'You dont have immediate annuity account with RICB';
  //         this.css = 'alert-warning';
  //         this.presentAlert();
  //       } else {
  //         let navigationExtras: NavigationExtras = {
  //           queryParams: {
  //             param: this.policyNumbers,
  //             cid: this.cidNo,
  //             type: 'immediatepolicyno'
  //           }
  //         };
  //         this.router.navigate(['/dashboard/annuity-scheme-details'], navigationExtras);
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
  //     if(type === 'deferred'){
  //     this.presentLoading();
  //     this.dataService.getDeferredAnnuity(this.cidNo).then(response => {
  //       console.log(response);
  //       this.policyNumbers = response.data;
  //       const res = JSON.parse(response.data);
  //       this.hideLoader();

  //       if(res.length === 0){
  //         this.status = 'Warning';
  //         this.message = 'You dont have deferred annuity account with RICB';
  //         this.css = 'alert-warning';
  //         this.presentAlert();
  //       } else {
  //         let navigationExtras: NavigationExtras = {
  //           queryParams: {
  //             param: this.policyNumbers,
  //             cid: this.cidNo,
  //             type: 'defferedpolicyno'
  //           }
  //         };
  //         this.router.navigate(['/dashboard/annuity-scheme-details'], navigationExtras);
  //       }
  //     }).catch(error => {
  //       console.error(error);
  //       this.hideLoader();
  //       this.status = 'Error';
  //       this.message = 'Problem occurred while fetching data. Please try again later';
  //       this.css = 'alert-error';
  //       this.presentAlert();
  //     });
  //   }  if(type === 'creditOthers'){
  //     let navigationExtras: NavigationExtras = {
  //       queryParams: {
  //         param: 'credit',
  //         remitterCid: this.cidNo,
  //       }
  //     };
  //     this.router.navigate(['/dashboard/others'], navigationExtras);
  //   } if(type === 'lifeOthers'){
  //     let navigationExtras: NavigationExtras = {
  //       queryParams: {
  //         param: 'life',
  //         remitterCid: this.cidNo,
  //       }
  //     };
  //     this.router.navigate(['/dashboard/others'], navigationExtras);
  //   } if(type === 'generalOthers'){
  //     let navigationExtras: NavigationExtras = {
  //       queryParams: {
  //         param: this.policyNumbers,
  //         type: 'generalOthers',
  //         remitterCid:this.cidNo
  //       }
  //     };
  //     this.router.navigate(['/dashboard/general-insurance-type-others'], navigationExtras);
  //   } if(type === 'deferredOthers'){
  //     let navigationExtras: NavigationExtras = {
  //       queryParams: {
  //         param: 'deferred',
  //         remitterCid: this.cidNo,
  //       }
  //     };
  //     this.router.navigate(['/dashboard/others'], navigationExtras);
  //   } if(type === 'ruralLifeOthers'){
  //     let navigationExtras: NavigationExtras = {
  //       queryParams: {
  //         param: 'ruralLife',
  //         remitterCid: this.cidNo,
  //       }
  //     };
  //     this.router.navigate(['/dashboard/others'], navigationExtras);
  //   } if(type === 'loanReport'){
  //     this.presentLoading();
  //     this.dataService.getCreditInvestment(this.cidNo).then(response => {
  //     console.log(response);
  //     this.policyNumbers = response.data;
  //     const res = JSON.parse(response.data);
  //     this.hideLoader();

  //       if(res.length === 0){
  //         this.status = 'Warning';
  //         this.message = 'You dont have credit account with RICB';
  //         this.css = 'alert-warning';
  //         this.presentAlert();
  //       } else {
  //         let navigationExtras: NavigationExtras = {
  //           queryParams: {
  //             param: this.policyNumbers,
  //             cid: this.cidNo,
  //             type: 'loanReport'
  //           }
  //         };
  //         this.router.navigate(['/dashboard/report-details'], navigationExtras);
  //       }
  //     }).catch(error => {
  //       console.error(error);
  //       this.hideLoader();
  //       this.status = 'Error';
  //       this.message = 'Problem occurred while fetching data. Please try again later';
  //       this.css = 'alert-error';
  //       this.presentAlert();
  //     });
  //   } if(type === 'ppfReport'){
  //     this.presentLoading();
  //     this.dataService.getPPFMemo(this.cidNo).then(response => {
  //       console.log(response);
  //       this.policyNumbers = response.data;
  //       const res = JSON.parse(response.data);
  //       this.hideLoader();

  //       if(res.length === 0){
  //         this.status = 'Warning';
  //         this.message = 'You dont have PPF account with RICB';
  //         this.css = 'alert-warning';
  //         this.presentAlert();
  //       } else {
  //         let navigationExtras: NavigationExtras = {
  //           queryParams: {
  //             param: this.policyNumbers,
  //             cid: this.cidNo,
  //             type: 'ppfReport'
  //           }
  //         };
  //         this.router.navigate(['/dashboard/report-details'], navigationExtras);
  //       }
  //     }).catch(error => {
  //       console.error(error);
  //       this.hideLoader();
  //       this.status = 'Error';
  //       this.message = 'Problem occurred while fetching data. Please try again later';
  //       this.css = 'alert-error';
  //       this.presentAlert();
  //     });
  //   } if(type === 'gisReport'){
  //     this.presentLoading();
  //     this.dataService.getGISReport(this.cidNo).then(response => {
  //       console.log(response);
  //       this.policyNumbers = response.data;
  //       const res = JSON.parse(response.data);
  //       this.hideLoader();

  //       if(res.length === 0){
  //         this.status = 'Warning';
  //         this.message = 'You dont have PPF account with RICB';
  //         this.css = 'alert-warning';
  //         this.presentAlert();
  //       } else {
  //         let navigationExtras: NavigationExtras = {
  //           queryParams: {
  //             param: this.policyNumbers,
  //             cid: this.cidNo,
  //             type: 'gisReport'
  //           }
  //         };
  //         this.router.navigate(['/dashboard/report-details'], navigationExtras);
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
  //   if(type == 'giReport'){
  //     let navigationExtras: NavigationExtras = {
  //       queryParams: {
  //         param: this.policyNumbers,
  //         cid: this.cidNo,
  //         type: 'giReport'
  //       }
  //     };
  //     this.router.navigate(['/dashboard/general-insurance-document'], navigationExtras);
  //   }
  //   if(type === 'tClaims'){
  //     this.presentLoading();
  //     this.dataService.trackGeneralclaims(this.cidNo).then(res => {
  //       console.log(res);
  //       const response = JSON.parse(res.data);
  //       this.policys = JSON.parse(res.data);
  //       this.hideLoader();

  //       if(this.policys.length === 0){
  //         this.status = 'Warning';
  //         this.message = 'No General Insurance Claims registered against your CID no.';
  //         this.css = 'alert-warning';
  //         this.presentAlert();
  //       } else {
  //         let navigationExtras: NavigationExtras = {
  //           queryParams: {
  //             param: this.policyNumbers,
  //             cid: this.cidNo,
  //             type: 'tClaims'
  //           }
  //         };
  //         this.router.navigate(['/dashboard/track-general-claim']);
  //       }
  //     }).catch(error => {
  //       console.error(error);
  //       this.hideLoader();
  //       this.status = 'Error';
  //       this.message = 'Problem occurred while fetching data. Please try again later';
  //       this.css = 'alert-error';
  //       this.presentAlert();
  //     });

  //   }if(type === 'lifeclaim'){
  //     this.router.navigate(['/dashboard/track-general-claim']);
  //  }
  }

  back() {
    this.navCtrl.navigateForward('/dashboard');
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

  // presentLoading() {
  //   this.loading = this.loadingCtrl.create({
  //     message: 'Please wait, loading details',
  //     spinner: 'bubbles'
  //   }).then((res) => {
  //     res.present();
  //     res.onDidDismiss().then((dis) => {});
  //   });
  // }

  // hideLoader() {
  //   setTimeout(() => {
  //     this.loadingCtrl.dismiss();
  //   }, 2000);
  // }

  // async presentAlert() {
  //   const alert = await this.alertCtrl.create({
  //   header: this.status.toUpperCase(),
  //   message: this.message,
  //   cssClass: this.css,
  //   buttons: ['OK']
  // });
  //   await alert.present();
  // }
}
