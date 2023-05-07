import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { NavController, PopoverController } from '@ionic/angular';
import { PopoverPage } from 'src/app/component/popover/popover.page';

@Component({
  selector: 'app-annuity-scheme-details',
  templateUrl: './annuity-scheme-details.page.html',
  styleUrls: ['./annuity-scheme-details.page.scss'],
})
export class AnnuitySchemeDetailsPage implements OnInit {
  param!: string;
  policyNumbers!: [];
  cidNo!: string;
  policyType!: string;

  deferredPolFlag = false;
  immediatePolFlag = false;
  emptyFlag = false;

  TEST:any
  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private popoverController: PopoverController,
    private router: Router
  ) { }

  ngOnInit() {
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

    // if(this.policyNumbers.length == 0) {
      if(this.policyType == "defferedpolicyno"){
        this.deferredPolFlag = true;
      } if(this.policyType == "immediatepolicyno"){
        this.immediatePolFlag = true;
      }
    // } else {
    //   this.emptyFlag = true;
    // }
  }

  //policyDetails Function
  policyDetails(policyNo:any, type:any){
    if(type === 'immediatedetails'){
      let navigationExtras: NavigationExtras = {
        queryParams: {
          param: policyNo,
          cidNo: this.cidNo,
          policyNumbers: this.policyNumbers
        }
      };
      this.router.navigate(['/dashboard/immediate-detail'], navigationExtras);
    } if(type === 'deferreddetails'){
      let navigationExtras: NavigationExtras = {
        queryParams: {
          param: policyNo,
          remitterCid: this.cidNo,
          policyNumbers: this.policyNumbers
        }
      };
      this.router.navigate(['/dashboard/deferred-detail'], navigationExtras);
    }
  }

  //back function
  back() {
    //this.navCtrl.navigateForward('/dashboard');
    let navigationExtras: NavigationExtras = {
      queryParams: {
        param: this.policyNumbers,
        cid: this.cidNo,
        type: 'defferedannuity'
      }
    };
    this.router.navigate(['/dashboard/common'], navigationExtras);
  }

  //open popover function
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


}
