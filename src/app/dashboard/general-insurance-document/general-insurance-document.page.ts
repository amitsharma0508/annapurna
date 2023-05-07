import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController, LoadingController, NavController, PopoverController } from '@ionic/angular';
import { DataService } from 'src/app/core/data.service';
import { REPORT_URL } from 'src/app/app.constants';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PDFGenerator } from '@ionic-native/pdf-generator/ngx';
import { PopoverPage } from 'src/app/component/popover/popover.page';

@Component({
  selector: 'app-general-insurance-document',
  templateUrl: './general-insurance-document.page.html',
  styleUrls: ['./general-insurance-document.page.scss'],
})
export class GeneralInsuranceDocumentPage implements OnInit {
  loading: any;
  status!: string;
  message!: string;
  css!: string;

  param!: string;
  policyNumbers!: [];
  policys!: [];
  cidNo!: string;
  policyType!: string;


  constructor( private route: ActivatedRoute,
    private popoverController: PopoverController,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private router: Router,
    private dataService: DataService,
    public sanitizer: DomSanitizer,
    private pdfGenerator:PDFGenerator) { }

  ngOnInit() {
    // this.cidNo = localStorage.getItem('cid');
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
  policyDetails(type:any){
    if(type === 'self'){
      let navigationExtras: NavigationExtras = {
      queryParams: {
        param: this.policyNumbers,
        cid: this.cidNo,
        type: 'selfReport'
      }
    };
    this.router.navigate(['/dashboard/report-details'], navigationExtras);
    }
    if(type === 'others'){
        // this.presentLoading();
        let navigationExtras: NavigationExtras = {
          queryParams: {
            param: 'othersReport',
            cid: this.cidNo,
          }
        };
        this.router.navigate(['/dashboard/others'], navigationExtras);
      }
    // if(type === 'self'){
    //   this.presentLoading();
    //     this.dataService.getGeneralActivePolicy(this.cidNo).then(response => {
    //     console.log(response);
    //     this.policyNumbers = response.data;
    //     const res = JSON.parse(response.data);
    //     this.hideLoader();

    //     if(res.length === 0){
    //       this.status = 'Warning';
    //       this.message = 'You dont have active MTP/OTIP policy with RICB';
    //       this.css = 'alert-warning';
    //       this.presentAlert();
    //     } else {
    //       let navigationExtras: NavigationExtras = {
    //         queryParams: {
    //           param: this.policyNumbers,
    //           cid: this.cidNo,
    //           type: 'selfReport'
    //         }
    //       };
    //       this.router.navigate(['/dashboard/report-details'], navigationExtras);
    //     }
    //   }).catch(error => {
    //     console.error(error);
    //     this.hideLoader();
    //     this.status = 'Error';
    //     this.message = 'Problem occurred while fetching data. Please try again later';
    //     this.css = 'alert-error';
    //     this.presentAlert();
    //   });
    // }
    // if(type === 'others'){
    //   this.presentLoading();
    //   let navigationExtras: NavigationExtras = {
    //     queryParams: {
    //       param: 'othersReport',
    //       cid: this.cidNo,
    //     }
    //   };
    //   this.router.navigate(['/dashboard/others'], navigationExtras);
    //   this.hideLoader();
    // }
  }

}
