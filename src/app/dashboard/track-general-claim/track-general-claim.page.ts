import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AlertController,
  LoadingController,
  NavController,
  PopoverController,
} from '@ionic/angular';
import { PopoverPage } from 'src/app/component/popover/popover.page';
import { DataService } from 'src/app/core/data.service';
import { REPORT_URL } from 'src/app/app.constants';

@Component({
  selector: 'app-track-general-claim',
  templateUrl: './track-general-claim.page.html',
  styleUrls: ['./track-general-claim.page.scss'],
})
export class TrackGeneralClaimPage implements OnInit {
  loading: any;
  status!: string;
  message!: string;
  css!: string;
  cidNo!: string;
  policy_no!: [];
  emptyFlag = false;
  policyTitle = false;
  policyNo: any;
  gclaimFlag: any;
  pdfSrc!: SafeResourceUrl;
  param!: string;
  pdfViewFlag = false;
  policyType!: string;
  policyNumbers!: [];

  constructor(
    private route: ActivatedRoute,
    private popoverController: PopoverController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private router: Router,
    private dataService: DataService,
    public sanitizer: DomSanitizer,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    // this.cidNo = localStorage.getItem('cid');

    // this.dataService.trackGeneralclaims(this.cidNo).then((response) => {
    //   console.log(response);
    //   this.policy_no = JSON.parse(response.data);
    // });

    this.policyTitle = false;
    this.gclaimFlag = false;

    this.route.queryParams.subscribe((params) => {
      this.param = params['param'];
      this.cidNo = params['cid'];
      this.policyType = params['type'];
    });
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

  //claim detail function
  claimDetails(policyNo:any) {
    const url = `${REPORT_URL}/genclaimstatus.php?policyNo=${policyNo}`;
    console.log(`url: ${url}`);
    this.emptyFlag = false;
    this.pdfViewFlag = true;
    this.pdfSrc = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  //close function
  close(){
    this.presentLoading();
    this.router.navigate(['/dashboard/']);
    this.hideLoader();
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

  //hide loading
  hideLoader() {
    setTimeout(() => {
      this.loadingCtrl.dismiss();
    }, 2000);
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

}
