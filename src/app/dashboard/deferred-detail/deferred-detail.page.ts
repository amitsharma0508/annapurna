import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController, LoadingController, NavController, PopoverController } from '@ionic/angular';
import { PopoverPage } from 'src/app/component/popover/popover.page';
import { DataService } from 'src/app/core/data.service';

@Component({
  selector: 'app-deferred-detail',
  templateUrl: './deferred-detail.page.html',
  styleUrls: ['./deferred-detail.page.scss'],
})
export class DeferredDetailPage implements OnInit {

  status!: string;
  message!: string;
  css!: string;
  loading: any;

  policyNumbers!:[];
  policyNo!: string;
  remitterCid!: string;
  policys: any;

  cidNo!: string;
  customerName!: string;
  departmentCode: number = 3;
  installment = '1';
  amountToPay!: number;
  premiumAmount: any;
  premiumType!: string;
  finalBankList: any[] = [];

  emptyFlag = false;

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
      this.remitterCid = params['remitterCid'];
      this.policyNumbers = params['policyNumbers'];
    });

    console.log(this.policyNumbers);
    this.getDeferredAnnuityDetails();
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

      //getDeferredAnnuityDetails
      getDeferredAnnuityDetails(){
        // this.presentLoading();
        // this.dataService.getDeferredAnnuityDetails(this.policyNo).then(res => {
        //   console.log(res);
        //   const response = JSON.parse(res.data);
        //   this.policys = JSON.parse(res.data);

        //   if(this.policys.length > 0){
        //     this.premiumAmount = response[0].PREMIUMAMOUNT;
        //     this.premiumType = response[0].PREMIUMTYPE;
        //     this.cidNo = response[0].CITYZENSHIPID;
        //     this.customerName = response[0].CUSTNAME;
        //     this.policyNo = response[0].PLOICY_NO;

        //     if(this.premiumType === 'Half Yearly'){
        //       this.installment = '6';
        //     } else {
        //       this.installment = '1';
        //     }

        //     this.calculateInitialInstallment();
        //   } else {
        //     this.emptyFlag = true;
        //   }

        //   this.hideLoader();
        // }).catch(() => {
        //   this.status = 'Error';
        //   this.message = 'Problem occured while fetching data. Please check your internet connection and try again';
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

    //confirmpayment
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

    //processPayment
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
      //             policyNo: this.policyNo,
      //             amount: this.amountToPay,
      //             type: 'deferred'
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
