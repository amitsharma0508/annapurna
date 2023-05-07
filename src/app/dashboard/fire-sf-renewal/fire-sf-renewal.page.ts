import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController, LoadingController, NavController, PopoverController } from '@ionic/angular';
import { PopoverPage } from 'src/app/component/popover/popover.page';
import { DataService } from 'src/app/core/data.service';

@Component({
  selector: 'app-fire-sf-renewal',
  templateUrl: './fire-sf-renewal.page.html',
  styleUrls: ['./fire-sf-renewal.page.scss'],
})
export class FireSfRenewalPage implements OnInit {
  status!: string;
  message!: string;
  css!: string;
  loading: any;

  policyNo!: string;
  paymentType!: string;
  remitterCid!: string;
  policys: any;
  renewButton = false;
  infoFlag = false;
  expiredFlag = false;
  activeFlag = false;
  departmentCode!: number;
  cidNo!: string;
  customerName!: string;
  polNo:any;
  addon:any;

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
      // this.dataService.getFireSFPrevDetails(this.policyNo).then(res => {
      //   const response = JSON.parse(res.data);
      //   this.policys = JSON.parse(res.data);

      //   console.log(response);

      //   if(this.policys.length > 0){
      //     this.cidNo = response[0].POL_CIVIL_ID;
      //     this.customerName = response[0].ASSUREDNAME;
      //     this.status = response[0].STATUS;
      //     this.addon = response[0].ADD_ON;

      //     if(this.status === 'Active' && response[0].MONTHS_DIFF <= 1){
      //       this.renewButton =true;
      //     }else if(this.status ==='Expired' && this.addon === '-' && response[0].MONTHS_DIFF <= 12){
      //       this.renewButton =true;
      //     }else if(this.status ==='Expired' && this.addon !== '-' && response[0].MONTHS_DIFF <= 12){
      //       this.infoFlag = true;
      //     }else if(this.status ==='Expired' &&  response[0].MONTHS_DIFF > 12){
      //       this.expiredFlag = true;
      //     }else if(this.status ==='Active' &&  response[0].MONTHS_DIFF > 1){
      //       this.activeFlag = true;
      //     }else{
      //       this.renewButton =false;
      //       this.infoFlag = false;
      //       this.expiredFlag = false;
      //       this.activeFlag = false;
      //     }
      //   }
      // }).catch(error => {
      //   console.error(error);
      //   this.status = 'Error';
      //   this.message = 'Problem occured while fetching data. Please check your internet connection and try again';
      //   this.css = 'alert-error';
      //   this.presentAlert();
      // });
    }

    //renew
    renew(policyNo:any){
      let navigationExtras: NavigationExtras = {
        queryParams: {
          param: policyNo,
          remitterCid: this.remitterCid
        }
      };
      this.router.navigate(['/dashboard/fire-sf-renewal-detail'], navigationExtras);
    }

    //complete
    complete(){
      sessionStorage.setItem('cidNo', this.cidNo);
      this.router.navigate(['/dashboard/']);
    }

}
