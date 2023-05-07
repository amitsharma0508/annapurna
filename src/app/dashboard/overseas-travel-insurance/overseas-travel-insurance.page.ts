import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController, LoadingController, NavController, PopoverController } from '@ionic/angular';
import { PopoverPage } from 'src/app/component/popover/popover.page';
import { DataService } from 'src/app/core/data.service';

@Component({
  selector: 'app-overseas-travel-insurance',
  templateUrl: './overseas-travel-insurance.page.html',
  styleUrls: ['./overseas-travel-insurance.page.scss'],
})
export class OverseasTravelInsurancePage implements OnInit {
  loading: any;
  status!: string;
  message!: string;
  css!: string;

  param!: string;

  policyNumbers!: [];
  plans!: [];

  cidNo!: string;
  policyType!: string;
  dob:any;
  countries: [] = [];
  traveldate:any;
  returndate:any;
  country:any;
  emptyFlag = false;
  pdfViewFlag = false;
  pdfSrc!: SafeResourceUrl;
  policys:any;
  data:any;
  now:any;
  plan:any;
  age1:any;
  noOfDays:any;
  desc:any;
  premium:any;
  suminsured:any;
  customerName:any;
  passport:any;
  expiry_dt:any;
  nominee:any;
  nomineecid:any;
  contact:any;
  relation:any;
  seqid!:number;
  srlno!:number;
  purpose:any;
  place:any;
  otipForm!: FormGroup;
  isSubmitted = false;
  agree: any;
  declaration: any;
  gender: any;
  ndob: any;
  medical: any;
  today = new Date().toJSON().split('T')[0];
  pCIDNo: any;
  address: any;
  remitterCid!: string;
  othersFlag = false;
  remarks:any;

  constructor(
    public sanitizer: DomSanitizer,
    private navCtrl: NavController,
    private popoverController: PopoverController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private route: ActivatedRoute,
    private dataService: DataService,
    private router: Router,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    ) {

     }

  ngOnInit() {
    this.othersFlag = false;
    this.createForm();
    this.route.queryParams.subscribe(params => {
    this.param = params['param'];
    this.cidNo = params['cid'];
    this.policyType = params['type'];
    this.country = params['country'];
    this.dob = params['dob'];
    this.traveldate = params['tdate'];
    this.returndate = params['rdate'];
    this.now=Date.now();
    this.remitterCid = params['remitterCid'];
  });

  if(this.param !== undefined){
    const response = JSON.parse(this.param);
    this.policyNumbers = JSON.parse(this.param);
    this.dob = response[0].DOB;
    this.pCIDNo =  response[0].CITIZEN_ID;
    this.customerName = response[0].CUSTOMER_NAME;
  }

  console.log(this.policyNumbers);
  console.log('cidNo',this.cidNo);
  console.log(this.customerName);
  console.log('remitterCid',this.remitterCid);

  if(this.dob == null ){
    this.updatedob();
  }else{
    this.getCountry();
  }
  // this.dataService.getSeqId().then(res => {
  //   const response = JSON.parse(res.data);
  //   this.plans = JSON.parse(res.data);
  // console.log(response);

  //   if(this.plans.length > 0){
  //     this.seqid = response[0].CODE;
  //   }
  // console.log(this.seqid);

  // }).catch(error => {
  //   console.error(error);
  //   this.status = 'Error';
  //   this.message = 'Problem occured while fetching data. Please check your internet connection and try again';
  //   this.css = 'alert-error';
  //   this.presentAlert();
  // });

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

  //errorControl
  get errorControl() {
    return this.otipForm.controls;
  }

  //createForm
  createForm() {
    this.otipForm = this.formBuilder.group({
      passport: ['', Validators.required],
      expiry_dt: ['', Validators.required],
      country: ['', Validators.required],
      place: ['', Validators.required],
      purpose: ['', Validators.required],
      traveldate: ['', Validators.required],
      returndate: ['', Validators.required],
      nominee: ['', Validators.required],
      gender: ['', Validators.required],
      nomineecid: ['', Validators.required],
      ndob: ['', Validators.required],
      contact: ['', Validators.required],
      relation: ['', Validators.required],
      address: ['', Validators.required],
      agree: ['', Validators.requiredTrue],
      declaration: ['', Validators.requiredTrue],
      medical: [''],
      remarks: [''],
    });
  }

  //updatedob
  async updatedob() {
    const alert = await this.alertCtrl.create({
    header: 'ALERT!',
    message: 'Your Date of Birth is not updated with RICB. Press OK to update.',
    cssClass: 'alert-warning',
    buttons: [
      {
        text: 'OK',
        handler: () => {
          this.updateDoB();
        }
      },
      {
        text: 'Cancel',
        handler: () => {
          this.router.navigate(['/dashboard/general-insurance-type']);
        }
      }
    ],
    backdropDismiss: false
  });
    await alert.present();
  }

  //updateDoB
  updateDoB(){
    console.log(this.pCIDNo);
    sessionStorage.setItem('cidNo', this.pCIDNo);
    this.router.navigate(['/dashboard/update-customer-dob']);

  }

  //getCountry
  getCountry(){

    // this.dataService.getCountry().then(res => {
    //   const response = JSON.parse(res.data);
    //   this.countries = JSON.parse(res.data);

    // });
  }

  //medicalCheck
  medicalCheck(){
    this.status = 'ALERT!';
    this.message = 'Medical reports are required, kindly visit our nearest office or call us at our toll free number 1818 for more information.';
    this.css = 'alert-warning';
    this.presentAlertOTIP();
  }

  //purposeEvent
  purposeEvent(){
    if(this.purpose ==='Others')
    {
      this.othersFlag = true;
    }else{
      this.othersFlag = false;
    }
  }

  //daysDiff
  daysDiff(){
    const fromdate = new Date(this.traveldate);
    const todate = new Date(this.returndate);
    let diff=Math.abs(todate.getTime() - fromdate.getTime() );
    let noOfDays=Math.floor((diff / (24 * 3600 * 1000))) + 1;
    this.noOfDays = noOfDays;

  }

  //getPlan
  getPlan(){
  //   this.isSubmitted = true;
  //   if (!this.otipForm.valid) {
  //     console.log('Please provide all the required values!')
  //     return false;
  //   } else {
  //   const bdate = new Date(this.dob);
  //   const tdate = new Date(this.traveldate);
  //   const rdate = new Date(this.returndate);

  //   let daysDiff=Math.abs(rdate.getTime() - tdate.getTime() );
  //   let days=Math.floor((daysDiff / (24 * 3600 * 1000))) + 1;

  //   let timeDiff = Math.abs(Date.now() - bdate.getTime() );
  //   let age = Math.floor((timeDiff / (1000 * 3600 * 24))/365.25);

  //   const cidNo = this.cidNo;
  //   const country = this.country;

  //   this.presentLoading();
  //   this.emptyFlag = false;
  //   this.pdfViewFlag = true;

  //   if(days > 180){
  //     this.status = 'ALERT!';
  //     this.message = 'Your policy period cannot exceed more than 180 days.';
  //     this.css = 'alert-warning';
  //     this.pdfViewFlag = false;
  //     this.presentAlertOTIP();
  //     this.hideLoader();
  //   }else{
  //   if(country==="CA" || country==="US"){
  //     if(days > 60 && age > 40){
  //       this.status = 'ALERT!';
  //       this.message = 'Medical reports are required, kindly visit our nearest office or call us at our toll free number 1818 for more information.';
  //       this.css = 'alert-warning';
  //       this.pdfViewFlag = false;
  //       this.presentAlertOTIP();
  //       this.hideLoader();
  //     }else{
  //     this.dataService.choosePlan(age,days,cidNo).then(res => {
  //       const response = JSON.parse(res.data);
  //       this.plans = JSON.parse(res.data);
  //       this.hideLoader();
  //     });
  //   }
  //   }
  //   else if(country=== "JP"){
  //     if(days > 60 && age > 60){
  //       this.status = 'ALERT!';
  //       this.message = 'Medical Reports are required, kindly visit our nearest office.';
  //       this.css = 'alert-warning';
  //       this.pdfViewFlag = false;
  //       this.presentAlertOTIP();
  //       this.hideLoader();
  //     }else{
  //     this.dataService.choosePlanJp(age,days,cidNo).then(res => {
  //       const response = JSON.parse(res.data);
  //       this.plans = JSON.parse(res.data);
  //       this.hideLoader();
  //     });
  //   }
  //   }
  //   else if(country==="AF"|| country==="AM"|| country==="AZ"|| country==="BH"|| country==="BD"|| country==="BT"||country==="BN"||
  //   country==="KH"||country==="CN"||country==="CY"||country==="GE"||country==="IN"||country==="ID"||country==="IR"||country==="IQ"||
  //   country==="IL"||country==="JO"||country==="KZ"||country==="KP"||country==="KR"||country==="KW"||country==="KG"||country==="LA"||
  //   country==="LB"||country==="MY"|| country==="MV"||country==="MN"||country==="MM"||country==="NP"||country==="OM"||country==="PK"||
  //   country==="PS"||country==="PH"||country==="QA"||country==="SA"||country==="SG"|| country==="LK"||country==="SY"||country==="TJ"||
  //   country==="TH"||country==="TL"||country==="TR"||country==="TM"||country==="AE"||country==="UZ"||country==="VN"||country==="YE"||country==="HK"){
  //     if(days > 60 && age > 60){
  //       this.status = 'ALERT!';
  //       this.message = 'Medical reports are required, kindly visit our nearest office or call us at our toll free number 1818 for more information.';
  //       this.css = 'alert-warning';
  //       this.pdfViewFlag = false;
  //       this.presentAlertOTIP();
  //       this.hideLoader();
  //     }else{
  //     this.dataService.choosePlanAsian(age,days,cidNo).then(res => {
  //       const response = JSON.parse(res.data);
  //       this.plans = JSON.parse(res.data);
  //       this.hideLoader();
  //     });
  //   }
  //   }else {
  //     if(days > 60 && age > 60){
  //       this.status = 'ALERT!';
  //       this.message = 'Medical reports are required, kindly visit our nearest office or call us at our toll free number 1818 for more information.';
  //       this.css = 'alert-warning';
  //       this.pdfViewFlag = false;
  //       this.presentAlertOTIP();
  //       this.hideLoader();
  //     }else{
  //       console.log(age);
  //       console.log(days);
  //     this.dataService.choosePlanAll(age,days).then(res => {
  //       const response = JSON.parse(res.data);
  //       this.plans = JSON.parse(res.data);
  //       this.hideLoader();
  //     });
  //   }
  // }
  // }
  // }
  }

  //choosePlan
  choosePlan(pcode:any,desc:any,premium:any,suminsured:any,DOB:any){
    const bdate = new Date(this.dob);
    const tdate = new Date(this.traveldate);
    const rdate = new Date(this.returndate);

    let daysDiff=Math.abs(rdate.getTime() - tdate.getTime() );
    let days=Math.floor((daysDiff / (24 * 3600 * 1000)))+1;
    let timeDiff = Math.abs(Date.now() - bdate.getTime() );
    let age = Math.floor((timeDiff / (1000 * 3600 * 24))/365.25);

    const data= {
      age:age,
      days:days,
      pcode:pcode,
      desc:desc,
      premium:premium,
      suminsured:suminsured,
      cid: this.cidNo,
      customerName:this.customerName,
      passport:this.passport,
      expiry_dt:this.expiry_dt,
      country:this.country,
      traveldate:this.traveldate,
      returndate:this.returndate,
      nominee:this.nominee,
      gender:this.gender,
      nomineecid:this.nomineecid,
      ndob:this.ndob,
      contact:this.contact,
      address:this.address,
      relation:this.relation,
      srlno:this.seqid,
      purpose:this.purpose,
      place:this.place,
      medical:this.medical,
      remarks:this.remarks,
     };
     console.log(data);
     this.presentLoading();
     this.http.post('http://apps.ricb.com.bt/MyRICBapi/otip_data_submit.php', JSON.stringify(data),{}).subscribe((response: any) => {
      console.log(response);
      this.hideLoader();
    });

      //  this.router.navigate(['/dashboard']);

    let navigationExtras: NavigationExtras = {
      queryParams: {
        desc: desc,
        premium: premium,
        suminsured: suminsured,
        cid: this.cidNo,
        customerName: this.customerName,
        srlno:this.seqid,
        remitterCid: this.remitterCid
      }
    };
   this.router.navigate(['/dashboard/overseas-travel-choose-plan'],navigationExtras);
  }

  async openTerms() {
    const alert = await this.alertCtrl.create({
      header: 'Terms and Conditions',
      message: 'I further declare that and warrant that the above statements are true and complete. I consent to the insurers seeking medical information from any doctor who has at any time attended concerning anything which affects my physical or mental health, and I authorize the giving of such information to TPA and / or their programmed medical advisers. I agree that this proposal shall form the basis of the contract should the insurance be affected. I am willing to accept the policy, subject to the terms, exceptions and conditions prescribed therein.',
      cssClass: 'alert-success',
      buttons: ['OK']
    });

    await alert.present();
  }

  //presentAlertOTIP
  async presentAlertOTIP() {
    const alert = await this.alertCtrl.create({
    header: this.status.toUpperCase(),
    message: this.message,
    cssClass: this.css,
    buttons: [
      {
        text: 'OK',
        handler: () => {
          this.router.navigate(['/dashboard/general-insurance-type']);
        }
      },
    ],
    backdropDismiss: false
  });
    await alert.present();
  }
}
