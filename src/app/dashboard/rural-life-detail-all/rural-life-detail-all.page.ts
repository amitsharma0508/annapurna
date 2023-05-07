import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController, LoadingController, ModalController, NavController, PopoverController } from '@ionic/angular';
import { PopoverPage } from 'src/app/component/popover/popover.page';
import { DataService } from 'src/app/core/data.service';
import { RuralLifeMembersPage } from '../rural-life-members/rural-life-members.page';

@Component({
  selector: 'app-rural-life-detail-all',
  templateUrl: './rural-life-detail-all.page.html',
  styleUrls: ['./rural-life-detail-all.page.scss'],
})
export class RuralLifeDetailAllPage implements OnInit {
  datePipe: DatePipe = new DatePipe('en-US');
  status!: string;
  message!: string;
  css!: string;
  loading: any;

  paymentType!: string;
  remitterCid!: string;

  policys: any;
  paymentOption = false;
  payButton = false;
  statusMessage = false;
  amtToPay = false;
  departmentCode: number=4;
  amountToPay!: number;

  cidNo!: string;
  customerName!: string;
  policyNo!: string;
  finalBankList: any[] = [];
  year:any;
  HoHCID:any;
  remCID:any;
  uwYear : any = (new Date()).getFullYear() + 1;
  currentDate:any = new Date();
  currentYear : any = (new Date()).getFullYear();
  serialNo: any;

  emptyFlag = false;

  isModalOpen = false;
  transformDate:any;

  constructor(  private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private popoverController: PopoverController,
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
    public modalController: ModalController) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.policyNo = params['param'];
      this.remitterCid = params['remitterCid'];
      this.paymentType = params['payType'];
      this.cidNo = params['cidNo'];

      this.transformDate = this.datePipe.transform(this.currentDate, 'dd/MM/yyyy');
      console.log(this.transformDate);
    });
      this.getRuralLifeDetails();
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

  //getRuralLifeDetails
  getRuralLifeDetails(){
    // this.presentLoading();
    // this.paymentOption = true;
    // console.log('cidNo',this.cidNo);
    // console.log('uw Year',this.uwYear);
    // this.dataService.getRuralDtl(this.cidNo,this.uwYear).then(res => {
    //   const response = JSON.parse(res.data);
    //   this.policys = JSON.parse(res.data);
    //   this.hideLoader();
    //   console.log(response);

    //   if(this.policys.length > 0){
    //     this.HoHCID = response[0].HOH_CID;
    //     this.customerName = response[0].HOH;
    //     this.policyNo = response[0].PERMANENT_HOUSE_NO;
    //     this.serialNo = response[0].SERIAL_NO;

    //     console.log('HOH Name',this.customerName);
    //     console.log('HOH CID',this.HoHCID);
    //     console.log('Remitter CID',this.cidNo);

    //       this.payButton = true;
    //       this.statusMessage = false;
    //       this.departmentCode = 4;
    //       this.amountToPay = response[0].TOTALPREMIUM;
    //       // this.amountToPay = 1;
    //       this.amtToPay = true;


    //         }
    // }).catch(() => {
    //   this.status = 'Error';
    //   this.message = 'Problem occured while fetching data. Please check your internet connection and try again';
    //   this.css = 'alert-error';
    //   this.presentAlert();
    //   this.hideLoader();
    // });
  }

  //checkPaidStatus
  checkpaidstatus(){
    // this.presentLoading();
    // this.dataService.checkRuralLifePayment(this.serialNo).then(res => {
    //   console.log(res);
    //   const response = JSON.parse(res.data);
    //   console.log(response);
    //   this.policys = JSON.parse(res.data);
    //   // this.year=response[0].UNDERWRITING_YEAR;
    //   console.log(this.uwYear);


    //   if(this.policys.length > 0){
    //     this.year=this.uwYear;
    //     this.confirmationAlert();
    //   }else{
    //     sessionStorage.setItem('cidNo', this.policyNo);
    //     this.confirmPayment();
    //   }
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

  //confirmationAlert
  async confirmationAlert() {
    const alert = await this.alertCtrl.create({
    header: 'ALERT!',
    message: 'Rural Life Insurance premium against house no. '+this.policyNo+' for the year ' +this.year+' is already paid. ',
    cssClass: 'alert-warning',
    buttons: [
      {
        text: 'OK',
        handler: () => {
          this.complete();
        }
      },

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

  //confirmPayment
  processPayment(paymentType:any){
    // const orderNo = Math.floor(1000000000 + Math.random() * 9000000000);
    // if(paymentType === 'RuralSelf'){
    //   this.remCID =this.cidNo;
    // }else{
    //   this.remCID =this.remitterCid;
    // }
    // this.dataService.postPayment(this.HoHCID, this.customerName, this.departmentCode, this.policyNo, this.amountToPay, orderNo, this.remCID).then(res => {
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
    //             cidNo: this.HoHCID,
    //             policyNo: this.policyNo,
    //             amount: this.amountToPay,
    //             remitterCid: this.remitterCid,
    //             type: 'rurallife'
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

  //open model
  async openModal(cid:any) {
    const modal = await this.modalController.create({
      component: RuralLifeMembersPage,
      componentProps: {
        "cidNo": cid,
        "uwYear":this.uwYear
        // "paramTitle": "Test Title"
      }
    });
    return await modal.present();
   }

}
