import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController, LoadingController, NavController, PopoverController } from '@ionic/angular';
import { PopoverPage } from 'src/app/component/popover/popover.page';
import { DataService } from 'src/app/core/data.service';

@Component({
  selector: 'app-credit-detail',
  templateUrl: './credit-detail.page.html',
  styleUrls: ['./credit-detail.page.scss'],
})
export class CreditDetailPage implements OnInit {

  status!: string;
  message!: string;
  css!: string;
  loading: any;

  accountNo!: string;
  paymentType!: string;
  remitterCid!: string;

  policys: any;
  paymentOption = false;
  payButton = false;
  statusMessage = false;
  amtToPay = false;
  departmentCode!: number;
  amountToPay!: number;

  cidNo!: string;
  customerName!: string;
  policyNo!: string;
  finalBankList: any[] = [];
  userArray:any[] = [];

  emptyFlag = false;

  constructor(
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private popoverController: PopoverController,
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
    private http: HttpClient,

  ) { }
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.accountNo = params['param'];
      this.remitterCid = params['remitterCid'];
      this.paymentType = params['payType'];
    });
    console.log('remitter',this.remitterCid);
    this.getCreditInvestmentDetails();
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

   //presentLoading method
   presentLoading() {
    this.loading = this.loadingCtrl.create({
      message: 'Please wait, loading details',
      spinner: 'bubbles'
    }).then((res) => {
      res.present();
      res.onDidDismiss().then((dis) => {});
    });
  }

  //hideLoader function
  hideLoader() {
    setTimeout(() => {
      this.loadingCtrl.dismiss();
    }, 2000);
  }

  //present Alert function
  async presentAlert() {
    const alert = await this.alertCtrl.create({
    header: this.status.toUpperCase(),
    message: this.message,
    cssClass: this.css,
    buttons: ['OK']
  });
    await alert.present();
  }

   //getCreditInvestmentDetails function
   getCreditInvestmentDetails(){
    // this.presentLoading();
    // this.paymentOption = true;
    // this.dataService.getCreditInvestmentDetails(this.accountNo).then(res => {
    //   const response = JSON.parse(res.data);
    //   this.policys = JSON.parse(res.data);
    //   this.hideLoader();

    //   console.log(response);

    //   if(this.policys.length > 0){
    //     this.cidNo = response[0].CID;
    //     this.customerName = response[0].NAME;
    //     this.policyNo = response[0].NUMBER;

    //     if(response[0].LOAN_STATUS === 'A'){
    //       this.payButton = true;
    //       this.statusMessage = false;
    //     } else {
    //       this.payButton = false;
    //       this.statusMessage = true;
    //     }

    //     if(this.paymentType === 'credit' || this.paymentType === 'others'){
    //       this.departmentCode = 1;
    //     }

    //     this.amtToPay = true;
    //   } else {
    //     this.emptyFlag = true;
    //   }
    // }).catch(error => {
    //   console.error(error);
    //   this.status = 'Error';
    //   this.message = 'Problem occured while fetching data. Please check your internet connection and try again';
    //   this.css = 'alert-error';
    //   this.presentAlert();
    // });
  }

  //confirm payment function
  confirmpayment(){
    if(this.amountToPay === 0 || this.amountToPay < 0){
      this.status = 'Warning';
      this.message = 'Invalid amount, please try again with a valid amount';
      this.css = 'alert-warning';
      this.presentAlert();
    } else {
      this.confirmationAlert();
    }
  }

  //processPayment function
  processPayment(){
    // this.presentLoading();
    // const orderNo = Math.floor(1000000000 + Math.random() * 9000000000);
    // this.dataService.postPayment(this.cidNo, this.customerName, this.departmentCode, this.policyNo, this.amountToPay, orderNo, this.remitterCid).then(res => {
    //   console.log(res);
    //   const response = JSON.parse(res.data);
    //   if(response[0].status === '1'){
    //     this.dataService.sendARRequest(this.amountToPay).then(response => {
    //       console.log(response);
    //       const finalCheckSum = response.data.toString();
    //       const checkSumString = finalCheckSum.split('&');
    //       const txnId = checkSumString[0].split('=');
    //       const status = checkSumString[1].split('=');
    //       if(status[1] === 'Success'){
    //         const bankListString: string[] = checkSumString[2].split('=');
    //         const bankList: string[] = bankListString[1].split('#');

    //         let navigationExtras: NavigationExtras = {
    //           queryParams: {
    //             param: bankList,
    //             txnId: txnId[1],
    //             orderNo: orderNo,
    //             cidNo: this.cidNo,
    //             policyNo: this.accountNo,
    //             amount: this.amountToPay,
    //             type: 'credit'
    //           }
    //         };
    //         this.router.navigate(['/dashboard/payment'], navigationExtras);
    //         this.hideLoader();
    //       }
    //     }).catch(error => {
    //       this.status = 'Error';
    //       this.message = 'Problem occured while processing payment. Please check your internet connection and try again';
    //       this.css = 'alert-error';
    //       this.presentAlert();
    //     });
    //   }
    // }).catch(error => {
    //   this.status = 'Error';
    //   this.message = 'Problem occured while processing payment. Please check your internet connection and try again';
    //   this.css = 'alert-error';
    //   this.presentAlert();
    // });
  }

  //confirmationAlert function
  async confirmationAlert() {
    const alert = await this.alertCtrl.create({
    header: 'Payment Confirmation',
    message: 'Total Amount Payable is Nu. '+this.amountToPay+' for account number: '+this.accountNo,
    cssClass: 'alert-success',
    buttons: [
      {
        text: 'OK',
        handler: () => {
          this.processPayment();
        }
      },
      {
        text: 'Cancel'
      }
    ],
    backdropDismiss: false
  });
    await alert.present();
  }
}
