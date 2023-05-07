import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController, LoadingController, NavController, PopoverController } from '@ionic/angular';
import { DataService } from 'src/app/core/data.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { PopoverPage } from 'src/app/component/popover/popover.page';

@Component({
  selector: 'app-general-claim-others',
  templateUrl: './general-claim-others.page.html',
  styleUrls: ['./general-claim-others.page.scss'],
})
export class GeneralClaimOthersPage implements OnInit {
  type!: string;
  remitterCid!: string;

  creditFlag = false;
  creditTitle = false;
  lifeFlag = false;
  lifeTitle = false;
  deferredFlag = false;
  deferredTitle = false;

  status!: string;
  message!: string;
  css!: string;
  loading: any;
  cid: any;
  cidNo: any;
  accountNo!: string;
  policyNumbers!: [];


  constructor( private navCtrl: NavController,
    private popoverController: PopoverController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private route: ActivatedRoute,
    private dataService: DataService,
    private router: Router,
    private http: HttpClient,) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.type = params['param'];
      this.remitterCid = params['remitterCid'];
      // this.cid = sessionStorage.getItem('cid');
    });

    if(this.type === 'credit'){
      this.creditFlag = true;
      this.creditTitle = true;
    } else if(this.type === 'life'){
      this.lifeFlag = true;
      this.lifeTitle = true;
    } else if(this.type === 'deferred'){
      this.deferredFlag = true;
      this.deferredTitle = true;
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
    policyDetails(){
      let navigationExtras: NavigationExtras = {
      queryParams: {
      param: "Different Owner",
      cid: this.cidNo,
      type: 'gclaim'
      }
      };
      this.router.navigate(['/dashboard/common'], navigationExtras);
      // this.presentLoading();
      // this.dataService.getGeneralclaims(this.cidNo).then(res => {
      //   console.log(res);
      //   this.policyNumbers = res.data;
      //   this.hideLoader();
      //   const response = JSON.parse(res.data);
      //   console.log(response);

      //   if(response.length === 0){
      //     this.status = 'Warning';
      //     this.message = 'No motor policies available against this CID No.';
      //     this.css = 'alert-warning';
      //     this.presentAlerta();
      //   } else {
      //     let navigationExtras: NavigationExtras = {
      //       queryParams: {
      //         param: this.policyNumbers,
      //         cid: this.cidNo,
      //         type: 'gclaim'
      //       }
      //     };
      //     this.router.navigate(['/dashboard/common'], navigationExtras);
      //   }
      // }).catch(error => {
      //   this.status = 'Error';
      //   this.message = 'Problem occurred while fetching data. Please try again later';
      //   this.css = 'alert-error';
      //   this.presentAlert();
      //   this.hideLoader();
      // });
    }

    //presentAlerta
    async presentAlerta() {
      const alert = await this.alertCtrl.create({
      header: this.status.toUpperCase(),
      message: this.message,
      cssClass: this.css,

      buttons: [
        {
          text: 'Ok',
          handler: () => {
             this.processClaim();
          }
        },

      ],
    });
      await alert.present();

    }

    //processClaim
    processClaim(){
      sessionStorage.setItem('cid', this.cidNo);
      this.router.navigate(['/dashboard/general-claim-type']);
      this.hideLoader();
    }

}
