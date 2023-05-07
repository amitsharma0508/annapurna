import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController, LoadingController, NavController, PopoverController } from '@ionic/angular';
import { PopoverPage } from 'src/app/component/popover/popover.page';
import { DataService } from 'src/app/core/data.service';

@Component({
  selector: 'app-general-renewal-others',
  templateUrl: './general-renewal-others.page.html',
  styleUrls: ['./general-renewal-others.page.scss'],
})
export class GeneralRenewalOthersPage implements OnInit {
  loading: any;
  status!: string;
  message!: string;
  css!: string;

  param!: string;

  policyNumbers!: [];
  policys!: [];
  cidNo!: string;
  policyType!: string;
  remitterCid:any;
  type!: string;
  mtpFlag=false;
  mcpFlag=false;
  fireFlag=false;
  customerName!: string;
  polNo:any;
  addon:any;

  constructor( private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private popoverController: PopoverController,
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.param = params['param'];
      this.remitterCid = params['remitterCid'];
      this.cidNo = params['cid'];
      this.type = params['type'];
  });
  if(this.param !== undefined){
    this.policyNumbers = JSON.parse(this.param);
  }

  if(this.type === 'mtp'){
    this.mtpFlag = true;
  } else if(this.type === 'mcp'){
    this.mcpFlag = true;
  } else if(this.type === 'fire'){
    this.fireFlag = true;
  }
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

  //policyDetails
  policyDetails(policyNo:any,type:any){
    if(type === 'mtp'){
      let navigationExtras: NavigationExtras = {
        queryParams: {
          param: policyNo,
          remitterCid: this.remitterCid
        }
      };
      this.router.navigate(['/dashboard/motor-tp-renewal-detail'], navigationExtras);
    }else if (type === 'mcp'){
      let navigationExtras: NavigationExtras = {
        queryParams: {
          param: policyNo,
          remitterCid: this.cidNo
        }
      };
      this.router.navigate(['/dashboard/motor-cp-renewal'], navigationExtras);
    }else if (type === 'fire'){
      let navigationExtras: NavigationExtras = {
        queryParams: {
         param: policyNo,
         remitterCid: this.remitterCid
       }
     };
     this.router.navigate(['/dashboard/fire-sf-renewal'], navigationExtras);
    }
  }

}
