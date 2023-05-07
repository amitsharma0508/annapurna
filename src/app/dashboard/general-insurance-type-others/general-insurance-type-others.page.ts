import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController, LoadingController, NavController, PopoverController } from '@ionic/angular';
import { PopoverPage } from 'src/app/component/popover/popover.page';
import { DataService } from 'src/app/core/data.service';

@Component({
  selector: 'app-general-insurance-type-others',
  templateUrl: './general-insurance-type-others.page.html',
  styleUrls: ['./general-insurance-type-others.page.scss'],
})
export class GeneralInsuranceTypeOthersPage implements OnInit {
  loading: any;
  status!: string;
  message!: string;
  css!: string;

  param!: string;

  policyNumbers!: [];
  policys!: [];
  cidNo: string='';
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

    this.route.queryParams.subscribe(params => {
      this.param = params['param'];
      // this.cidNo = params.cidNo;
      this.remitterCid = params['remitterCid'];
      this.policyType = params['type'];
    });

    console.log('cidNo',this.cidNo);
    console.log('cidNo',this.remitterCid);
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

  //policyDetails
  policyDetails(type:any){
    if(type==='mtpOthers'){
      let navigationExtras: NavigationExtras = {
        queryParams: {
          param: 'general',
          remitterCid: this.cidNo,
        }
      };
      this.router.navigate(['/dashboard/others'], navigationExtras);
    }
    else if(type==='otipOthers'){
      let navigationExtras: NavigationExtras = {
        queryParams: {
          param: 'otip',
          remitterCid: this.cidNo,
        }
      };
      this.router.navigate(['/dashboard/others'], navigationExtras);
    }
    else if(type==='mcpOthers'){
      let navigationExtras: NavigationExtras = {
        queryParams: {
          param: 'mcp',
          remitterCid: this.cidNo,
        }
      };
      this.router.navigate(['/dashboard/others'], navigationExtras);
    }
    else if(type==='fireOthers'){
      let navigationExtras: NavigationExtras = {
        queryParams: {
          param: 'fire',
          remitterCid: this.cidNo,
        }
      };
      this.router.navigate(['/dashboard/others'], navigationExtras);
    }

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
  sessionStorage.setItem('cid', this.cidNo);
  sessionStorage.setItem('remitterCid', this.cidNo);
  this.router.navigate(['/dashboard/create-new-customer']);
  this.hideLoader();
}


}
