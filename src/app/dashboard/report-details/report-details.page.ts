import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController, LoadingController, NavController, PopoverController } from '@ionic/angular';
import { REPORT_URL } from 'src/app/app.constants';
import { PDFGenerator } from '@ionic-native/pdf-generator/ngx';
import { DatePipe } from '@angular/common';
import { PopoverPage } from 'src/app/component/popover/popover.page';

@Component({
  selector: 'app-report-details',
  templateUrl: './report-details.page.html',
  styleUrls: ['./report-details.page.scss'],
})
export class ReportDetailsPage implements OnInit {
  param!: string;
  policyNumbers!: [];
  cidNo!: string;
  polNo:any;
  policyType!: string;

  policyTitle = false;
  creditTitle = false;
  loanReportFlag = false;
  gisReportFlag = false;
  selfReportFlag = false;
  mtpReportFlag = false;
  otipReportFlag = false;
  ppfReportFlag = false;
  giReportFlag = false;
  deferredPolFlag = false;
  immediatePolFlag = false;
  emptyFlag = false;
  pdfViewFlag = false;

  fromDate!: string;
  toDate!: string;
  pdfSrc!: SafeResourceUrl;

  constructor(
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private popoverController: PopoverController,
    private alertCtrl: AlertController,
    public sanitizer: DomSanitizer,
    private router: Router,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private pdfGenerator:PDFGenerator
  ) { }

  ngOnInit() {
    this.policyTitle = false;
    this.creditTitle = false;
    this.loanReportFlag = false;
    this.ppfReportFlag = false;
    this.gisReportFlag = false;
    this.giReportFlag = false;
    this.selfReportFlag = false;

    this.mtpReportFlag = false;
    this.otipReportFlag = false;

    this.route.queryParams.subscribe(params => {
      this.param = params['param'];
      this.cidNo = params['cid'];
      this.policyType = params['type'];
    });

    // if(this.param !== undefined){
    //   this.policyNumbers = JSON.parse(this.param);
    // }

    console.log(this.policyNumbers);
    console.log(this.cidNo);
    console.log(this.policyType);
    console.log(this.param);

    // if(this.policyNumbers.length > 0) {
      if(this.policyType == "loanReport"){
        this.loanReportFlag = true;
        this.creditTitle = true;

      } if(this.policyType == "ppfReport"){
        this.ppfReportFlag = true;
        this.policyTitle = true;

      } if(this.policyType == "gisReport"){
        this.gisReportFlag = true;
        this.policyTitle = true;
      }if(this.policyType == "giReport"){
        this.giReportFlag = true;
        this.policyTitle = true;
      }if(this.policyType == "selfReport"){
        this.selfReportFlag = true;
        this.policyTitle = true;
      }
    // } else {
    //   this.emptyFlag = true;
    // }
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

    //getPDFreport
    getPDFreport(policyNo:any,prodCode:any){
      if(prodCode === 'PR00000043'){
       const url = `${REPORT_URL}/motorTpDocument.php?polNo=${policyNo}`;
       let options = {
         documentSize: 'A4',
         type: 'share',
         fileName: 'MTP Schedule.pdf',
       }

       this.pdfGenerator.fromURL(url, options).
         then(resolve => {
           console.log(resolve);
         }
         ).catch((err) => {
           console.error(err);
         });
      }else if (prodCode === 'PR00000032'){
       const url = `${REPORT_URL}/otipDocument.php?polNo=${policyNo}`;
       let options = {
         documentSize: 'A4',
         type: 'share',
         fileName: 'OTIP Schedule.pdf',
       }

       this.pdfGenerator.fromURL(url, options).
         then(resolve => {
           console.log(resolve);
         }
         ).catch((err) => {
           console.error(err);
         });
      }else if (prodCode === 'PR00000041'){
       const url = `${REPORT_URL}/mcpDocument.php?polNo=${policyNo}`;
       let options = {
         documentSize: 'A4',
         type: 'share',
         fileName: 'Motor Comprehensive Schedule.pdf',
       }

       this.pdfGenerator.fromURL(url, options).
         then(resolve => {
           console.log(resolve);
         }
         ).catch((err) => {
           console.error(err);
         });
      }
      else if (prodCode === 'PR00000009'){
       const url = `${REPORT_URL}/fireDocument.php?polNo=${policyNo}`;
       let options = {
         documentSize: 'A4',
         type: 'share',
         fileName: 'Fire-SF Schedule.pdf',
       }

       this.pdfGenerator.fromURL(url, options).
         then(resolve => {
           console.log(resolve);
         }
         ).catch((err) => {
           console.error(err);
         });
      }
     }

    //policyDetails
    policyDetails(policyNo:any, type:any){
    if(type === 'loanReportPdf'){
      this.showDatePickerAlert(policyNo);
    } else if(type === 'gisReportPdf'){
      const url = `${REPORT_URL}/gis-memo.php?cid=${this.cidNo}`;
      this.emptyFlag = false;
      this.pdfViewFlag = true;
      this.pdfSrc = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    } else if(type === 'ppfReportPdf'){
      const url = `${REPORT_URL}/ppf-memo.php?cid=${this.cidNo}`;
      this.emptyFlag = false;
      this.pdfViewFlag = true;
      this.pdfSrc = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    } else if(type === 'generateLoanPDF'){
      const fromDate = this.datePipe.transform(this.fromDate, 'yyyy-MM-dd');
      const toDate = this.datePipe.transform(this.toDate, 'yyyy-MM-dd');
      const url = `${REPORT_URL}/loanstatement.php?CREDIT_ID=${policyNo}&FROM_DATE=${fromDate}&TO_DATE=${toDate}`;
      console.log(`url: ${url}`);
      this.emptyFlag = false;
      this.pdfViewFlag = true;
      this.pdfSrc = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
  }

  //showDatePickerAlert
  async showDatePickerAlert(policyNo:any) {
    const alert = await this.alertCtrl.create({
      header: 'Select Date',
      inputs: [
        {
          name: 'fromDate',
          type : 'date',
          placeholder: 'From Date'
        },
        {
          name: 'toDate',
          type : 'date',
          placeholder: 'To Date'
        }
      ],
      buttons: [
        {
          text: 'Submit',
          role: 'submit',
          handler: data => {
            this.fromDate = data.fromDate;
            this.toDate = data.toDate;
            alert.dismiss();
            this.policyDetails(policyNo, 'generateLoanPDF');
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

}
