import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController, LoadingController, NavController, PopoverController } from '@ionic/angular';
import { PopoverPage } from 'src/app/component/popover/popover.page';
import { DataService } from 'src/app/core/data.service';

@Component({
  selector: 'app-life-detail',
  templateUrl: './life-detail.page.html',
  styleUrls: ['./life-detail.page.scss'],
})
export class LifeDetailPage implements OnInit {

  policyNo!: string;
  remitterCid!: string;

  status!: string;
  message!: string;
  css!: string;
  loading: any;

  policys: [] = [];
  departmentCode = '2';
  premiumAmount: any;
  installment = '1';
  amountToPay!: number;
  policyStatus!: boolean;

  cidNo!: string;
  customerName!: string;

  finalBankList: any[] = [];
  emptyFlag = false;

  pMode!: string;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private popoverController: PopoverController,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.policyNo = params['param'];
      this.remitterCid = params['remitterCid'];
    });

    this.getLifeInsuranceDetails();
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

    //getLifeInsuranceDetails function
    getLifeInsuranceDetails(){
      // this.presentLoading();
      // this.dataService.getLifeInsuranceDetails(this.policyNo).then(res => {
      //   const response = JSON.parse(res.data);
      //   this.policys = JSON.parse(res.data);

      //   if(this.policys.length > 0){
      //     this.premiumAmount = response[0].PREMIUM;
      //     this.cidNo = response[0].CUST_CID;
      //     this.customerName = response[0].POLICY_HOLDER;
      //     this.pMode = response[0].P_MODE;
      //     if(response[0].POLSTATUS === 'ACTIVE'){
      //       this.policyStatus = true;
      //     } else {
      //       this.policyStatus = false;
      //     }

      //     // if(response[0].P_MODE === 'HALF YEARLY'){
      //     //   this.installment = '6';
      //     // } else {
      //     //   this.installment = '1';
      //     // }

      //     this.calculateInitialInstallment();
      //   } else {
      //     this.emptyFlag = true;
      //   }

      //   this.hideLoader();
      // }).catch(() => {
      //   this.status = 'Error';
      //   this.message = 'Problem occured while processing payment. Please check your internet connection and try again';
      //   this.css = 'alert-error';
      //   this.presentAlert();
      //   this.hideLoader();
      // });
    }

    //calculateInitialInstallment
    calculateInitialInstallment(){
      this.premiumAmount = this.premiumAmount.replace(',', '');
      this.amountToPay = this.premiumAmount * parseInt(this.installment);
    }

    //calculateInstallment
    calculateInstallment(value:any){
      this.premiumAmount = this.premiumAmount.replace(',', '');
      this.amountToPay = this.premiumAmount * value;
    }

    //confirmPayment
    confirmPayment(){
      if(this.amountToPay === 0 || this.amountToPay < 0){
        this.status = 'Warning';
        this.message = 'Invalid amount, please try again with a valid amount';
        this.css = 'alert-warning';
        this.presentAlert();
      } else {
        this.confirmationAlert();
      }
    }

    //processPayment
    processPayment(){
      this.presentLoading();
      // const orderNo = Math.floor(1000000000 + Math.random() * 9000000000);
      // this.dataService.postPayment(this.cidNo, this.customerName, this.departmentCode, this.policyNo, this.amountToPay, orderNo, this.remitterCid).then(res => {
      //   const response = JSON.parse(res.data);
      //   if(response[0].status === '1'){
      //     this.dataService.sendARRequest(this.amountToPay).then(response => {
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
      //             cidNo: this.remitterCid,
      //             policyNo: this.policyNo,
      //             amount: this.amountToPay,
      //             type: 'life'
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

    //presentLoading
    presentLoading() {
      this.loading = this.loadingCtrl.create({
        message: 'Please wait, loading details',
        spinner: 'bubbles'
      }).then((res) => {
        res.present();
        res.onDidDismiss().then((dis) => {});
      });
    }

    //hideLoader
    hideLoader() {
      setTimeout(() => {
        this.loadingCtrl.dismiss();
      }, 2000);
    }

    //presentAlert
    async presentAlert() {
      const alert = await this.alertCtrl.create({
      header: this.status.toUpperCase(),
      message: this.message,
      cssClass: this.css,
      buttons: ['OK']
    });
      await alert.present();
    }

    //confirmationAlert
    async confirmationAlert() {
      const alert = await this.alertCtrl.create({
        header: 'Payment Confirmation',
        message: 'Total Amount Payable is Nu. '+this.amountToPay+' for policy number: '+this.policyNo,
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
