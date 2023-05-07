import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertController, PopoverController } from '@ionic/angular';
import { PopoverPage } from 'src/app/component/popover/popover.page';

@Component({
  selector: 'app-rural-housing-insurance',
  templateUrl: './rural-housing-insurance.page.html',
  styleUrls: ['./rural-housing-insurance.page.scss'],
})
export class RuralHousingInsurancePage implements OnInit {
  @ViewChild('f') form!:NgForm;
  ruralHousingCIDRegistered!:boolean;
  constructor(private popoverController: PopoverController,private alertController: AlertController,) { }

  ngOnInit() {
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

  SearchRuralHousingCIDRegistered(){
    const licenseNo = "123456"
    console.log(this.form.value)
    if(this.form.value['tourOperatorLicenseNo'] == licenseNo){
      this.ruralHousingCIDRegistered = true;
    }else{
      this.ruralHousingCIDRegistered = false;
      this.presentAlert();
    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'https:RICB.bt',
      message: 'You are not registered with us. please click to above link to register',
      buttons: ['OK'],
    });

    await alert.present();
  }

}
