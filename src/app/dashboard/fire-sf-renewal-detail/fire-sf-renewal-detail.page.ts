import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController, LoadingController, NavController, PopoverController } from '@ionic/angular';
import { PopoverPage } from 'src/app/component/popover/popover.page';
import { DataService } from 'src/app/core/data.service';

@Component({
  selector: 'app-fire-sf-renewal-detail',
  templateUrl: './fire-sf-renewal-detail.page.html',
  styleUrls: ['./fire-sf-renewal-detail.page.scss'],
})
export class FireSfRenewalDetailPage implements OnInit {
  status!: string;
  message!: string;
  css!: string;
  loading: any;

  policyNo!: string;
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
  polNo:any;
  premiumAmount: any;

  finalBankList: any[] = [];

  emptyFlag = false;

  constructor(private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private popoverController: PopoverController,
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.policyNo = params['param'];
      this.remitterCid = params['remitterCid'];
      this.paymentType = params['payType'];
    });
    console.log('policyNo',this.policyNo);
    this.getFireSFDetails();
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

      //getFireSFDetails
      getFireSFDetails(){
        // this.presentLoading();
        // this.paymentOption = true;
        // this.dataService.getFireSFDetails(this.policyNo).then(res => {
        //   const response = JSON.parse(res.data);
        //   this.policys = JSON.parse(res.data);
        //   this.hideLoader();

        //   console.log(response);

        //   if(this.policys.length > 0){
        //     this.cidNo = response[0].POL_CIVIL_ID;
        //     this.customerName = response[0].ASSUREDNAME;
        //     // this.policyNo = response[0].POL_SYS_ID;
        //     // this.polNo=response[0].POL_NO;
        //     // this.amountToPay = response[0].PREMIUM;

        //       this.payButton = true;
        //       this.statusMessage = false;
        //       this.payButton = false;
        //       this.statusMessage = true;
        //       this.departmentCode = 8;
        //       this.amountToPay = 1;

        //       console.log('cidNo',this.cidNo);
        //       console.log('remitter',this.remitterCid);
        //     }else{
        //       this.status = 'Error';
        //       this.message = 'Proposal is not created. Call 1818 or visit our nearest office.';
        //       this.css = 'alert-warning';
        //       this.presentAlert();
        //     }
        // }).catch(error => {
        //   console.error(error);
        //   this.status = 'Error';
        //   this.message = 'Problem occured while fetching data. Please check your internet connection and try again';
        //   this.css = 'alert-error';
        //   this.presentAlert();
        // });
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
        // console.log('cidNo',this.cidNo);
        // console.log('custName',this.customerName);
        // console.log('depCode',this.departmentCode);
        // console.log('policyNo',this.policyNo);
        // console.log('amt',this.amountToPay);
        // console.log('orderNo',orderNo);
        // console.log('Remitter',this.remitterCid);

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
        //             type: 'firesf'
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

      //complete
      complete(){
        sessionStorage.setItem('cidNo', this.cidNo);
        this.router.navigate(['/dashboard/']);
      }


}
