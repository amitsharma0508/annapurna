import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, NavController, PopoverController } from '@ionic/angular';
import { PopoverPage } from 'src/app/component/popover/popover.page';
import { DataService } from 'src/app/core/data.service';
// import { PDFGenerator } from '@ionic-native/pdf-generator/ngx';

@Component({
  selector: 'app-general-detail',
  templateUrl: './general-detail.page.html',
  styleUrls: ['./general-detail.page.scss'],
})
export class GeneralDetailPage implements OnInit {
  status!: string;
  message!: string;
  css!: string;
  loading: any;

  policyNo!: string;
  cidNo!: string;

  policys: any;
  prod: any;

  othersFlag =false;
  reportOFlag = false;
  reportMFlag = false;
  reportCFlag = false;
  reportFFlag = false;
  regNoFlag = false;
  otipSIFlag = false;

  constructor(
    private navCtrl: NavController,
    private popoverController: PopoverController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private route: ActivatedRoute,
    private dataService: DataService,
    private router: Router,
    // private pdfGenerator:PDFGenerator
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.policyNo = params['param'];
      this.cidNo = params['remitterCid'];
    });

    console.log(this.policyNo);

    this.getGeneralInsuranceDetails();
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

  //getGeneralInsuranceDetails Function --> this function run on load
  //and depending upon the policy number it decide which flag to make true
  getGeneralInsuranceDetails(){
    // this.presentLoading();
    // this.dataService.getGeneralInsuranceDetails(this.policyNo).then(res => {
    //   console.log(res);
    //   const response = JSON.parse(res.data);
    //   this.policys = JSON.parse(res.data);
    //   this.prod = response[0].POLICYCODE;
    //     if(this.prod === 'Motor - Third Party'){
    //       this.othersFlag = false;
    //       this.reportMFlag = true;
    //       this.regNoFlag = true;
    //     } else if(this.prod === 'Overseas Travel Insurance'){
    //       this.reportOFlag = true;
    //       this.otipSIFlag = true;
    //       this.regNoFlag = false;
    //       this.othersFlag = false;
    //     }else if(this.prod === 'Motor - Comprehensive'){
    //       this.reportCFlag = true;
    //       this.regNoFlag = true;
    //       this.othersFlag = true;
    //     }else if(this.prod === 'Standard Fire'){
    //       this.reportFFlag = true;
    //     }else{
    //       this.othersFlag = true;
    //       this.regNoFlag = false;
    //     }
    //   this.hideLoader();
    // }).catch(error => {
    //   console.error(error);
    //   this.status = 'Error';
    //   this.message = 'Problem occured while fetching data. Please check your internet connection and try again';
    //   this.css = 'alert-error';
    //   this.presentAlert();
    //   this.hideLoader();
    // });
  }

  //generatePolicyCert function is for printing in pdf form depending on which flag was made true on load by the
  //getGeneralInsuranceDetails function
  generatePolicyCert(prod:any){
  //   console.log('polNo',this.policyNo);
  // if(prod === 'Motor'){
  //   const url = `${REPORT_URL}/motorTpDocument.php?polNo=${this.policyNo}`;
  //   let options = {
  //   documentSize: 'A4',
  //   type: 'share',
  //   fileName: 'MTP Schedule.pdf',
  //   }
  //   this.pdfGenerator.fromURL(url, options).
  //     then(resolve => {
  //       console.log(resolve);
  //     }
  //     ).catch((err) => {
  //       console.error(err);
  //     });
  // }else if(prod === 'OTIP'){
  //   const url = `${REPORT_URL}/otipDocument.php?polNo=${this.policyNo}`;
  //   let options = {
  //     documentSize: 'A4',
  //     type: 'share',
  //     fileName: 'OTIP Schedule.pdf',
  //   }
  //   this.pdfGenerator.fromURL(url, options).
  //     then(resolve => {
  //       console.log(resolve);
  //     }
  //     ).catch((err) => {
  //       console.error(err);
  //     });
  // }else if(prod === 'MCP'){
  //   const url = `${REPORT_URL}/mcpDocument.php?polNo=${this.policyNo}`;
  //   let options = {
  //     documentSize: 'A4',
  //     type: 'share',
  //     fileName: 'Motor Comprehensive Schedule.pdf',
  //   }
  //   this.pdfGenerator.fromURL(url, options).
  //     then(resolve => {
  //       console.log(resolve);
  //     }
  //     ).catch((err) => {
  //       console.error(err);
  //     });
  // }else if(prod === 'FIRE'){
  //   const url = `${REPORT_URL}/fireDocument.php?polNo=${this.policyNo}`;
  //   let options = {
  //     documentSize: 'A4',
  //     type: 'share',
  //     fileName: 'Fire-SF Schedule.pdf',
  //   }
  //   this.pdfGenerator.fromURL(url, options).
  //     then(resolve => {
  //       console.log(resolve);
  //     }
  //     ).catch((err) => {
  //       console.error(err);
  //     });
  // }
  }

}
