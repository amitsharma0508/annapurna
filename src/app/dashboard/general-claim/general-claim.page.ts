import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController, LoadingController, NavController, PopoverController } from '@ionic/angular';
import { DataService } from 'src/app/core/data.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PopoverPage } from 'src/app/component/popover/popover.page';
// import { OtpModalComponent } from 'src/app/component/otp-modal/otp-modal.component';

@Component({
  selector: 'app-general-claim',
  templateUrl: './general-claim.page.html',
  styleUrls: ['./general-claim.page.scss'],
})
export class GeneralClaimPage implements OnInit {
  regClaimsForm!: FormGroup;
  status!: string;
  message!: string;
  css!: string;
  loading: any;
  policyNo!: string;
  cidNo!: string;
  policys: any;
  lossdate: any;
  losstime: any;
  cause: any;
  branch: any;
  description!: string;
  place:any;
  isSubmitted = false;
  cid:any;
  relation:any;


  constructor(
    private navCtrl: NavController,
    private popoverController: PopoverController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private route: ActivatedRoute,
    private dataService: DataService,
    private router: Router,
    private http: HttpClient,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.createForm();
    this.route.queryParams.
    subscribe(params => {
      this.policyNo = params['param'];
      this.cid = localStorage.getItem('cid');
      // this.policyNo = sessionStorage.getItem('policyNo');
    });

    console.log(this.policyNo);

    this.getGeneralInsuranceDetails();
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

  //errorControl
  get errorControl() {
    return this.regClaimsForm.controls;
  }

  //createForm
  createForm() {
    this.regClaimsForm = this.formBuilder.group({
      place: ['', Validators.required],
      lossdate: ['', Validators.required],
      losstime: ['', Validators.required],
      cause: ['', Validators.required],
      branch: ['', Validators.required],
      description: ['', Validators.required],
      relation: ['', Validators.required],
    });
  }

  //getGeneralInsuranceDetails
  getGeneralInsuranceDetails(){
    // this.presentLoading();
    // this.dataService.getGeneralInsuranceDetails(this.policyNo).then(res => {
    //   console.log(res);
    //   const response = JSON.parse(res.data);
    //   this.policys = JSON.parse(res.data);
    // // this.cid=response[0].POL_CIVIL_ID;
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

  //claim
  claim() {
    // this.isSubmitted = true;
    // if (!this.regClaimsForm.valid) {
    //   console.log('Please provide all the required values!')
    //   return false;
    // } else {
    //   this.presentLoading();
    //   this.dataService.getClaimStatusDetails(this.policyNo).then(res => {
    //     console.log(res);
    //     const response = JSON.parse(res.data);
    //     console.log(response);
    //     this.policys = JSON.parse(res.data);


    //     if(this.policys.length > 0){
    //       this.confirmationAlertc();
    //     }else{

    //   this.confirmationAlert();
    //     }
    //     this.hideLoader();
    //   }).catch(error => {
    //     console.error(error);
    //     this.status = 'Error';
    //     this.message = 'Problem occured while fetching data. Please check your internet connection and try again';
    //     this.css = 'alert-error';
    //     this.presentAlert();
    //     this.hideLoader();
    //   });
    // }
  }

  //confirmationAlert
  async confirmationAlert() {
    const alert = await this.alertCtrl.create({
    header: 'Confirmation!',
    message: 'Would you like to proceed your request?',
    cssClass: 'alert-success',
    buttons: [
      {
        text: 'Yes',
        handler: () => {
           this.processClaim();
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

  //processClaim
  processClaim(){
    const data= {
      cid: this.cid,
      policy: this.policyNo,
      place: this.place,
      lossdate: this.lossdate,
      losstime: this.losstime,
      cause: this.cause,
      branch: this.branch,
      description: this.description,
      relation: this.relation,
    };
      this.presentLoading();
        this.http.post('https://apps.ricb.bt/MyRICBapi/generalclaim.php', JSON.stringify(data),{}).subscribe((response: any) => {
    console.log(response);

  });
      this.router.navigate(['/dashboard/']);
      this.hideLoader();
  }

  //confirmationAlertc
  async confirmationAlertc() {

    const alert = await this.alertCtrl.create({
    header: 'WARNING!',
    message: 'Claim already in progess',
    cssClass: 'alert-warning',
    buttons: [
      {
        text: 'OK',
        handler: () => {
          this.completeClaim();
        }
      },
    ],
    backdropDismiss: false
  });
    await alert.present();
  }

  //completeClaim
  completeClaim(){
    sessionStorage.setItem('cidNo', this.cidNo);
    this.router.navigate(['/dashboard/']);
  }

}
