import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, PopoverController } from '@ionic/angular';
import { PopoverPage } from 'src/app/component/popover/popover.page';
import { AddPassangerComponent } from './add-passanger/add-passanger.component';

@Component({
  selector: 'app-domestic-travel-insurance',
  templateUrl: './domestic-travel-insurance.page.html',
  styleUrls: ['./domestic-travel-insurance.page.scss'],
})
export class DomesticTravelInsurancePage implements OnInit {
   addPassengerToggle:boolean=false;
   vehicleNumber = '';
   passengerList:any=[]
  constructor( private popoverController: PopoverController,private modalCtrl: ModalController, private loadingCtrl:LoadingController,) { }

  ngOnInit() {
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

  addPassenger(){
    if(this.addPassengerToggle === false){
      this.addPassengerToggle = true;
    }else{
      this.addPassengerToggle = false;
    }
  }
  // onVehicleNumberChanges(event: Event) {
  //   const input = event.target as HTMLInputElement;
  //   const inputValue = input.value.toUpperCase();

  //   if (inputValue.length <= 2) {
  //     input.value = inputValue.replace(/[^BP]/g, '');
  //   } else if (inputValue.length <= 4) {
  //     input.value = inputValue.replace(/[^BP][^T]/g, '');
  //   } else if (inputValue.length <= 6) {
  //     input.value = inputValue.replace(/[^BP][^T][^0-9]/g, '');
  //   }

  //   this.vehicleNumber = input.value;

  // }

  onVehicleNumberChange(){
    const hyphenPositions = [1];
    let hyphenAdded = false;

    const inputField = document.getElementById("input") as HTMLInputElement;
    const errorMsg = document.querySelector('#error-msg');
     // Pattern for vehicle number as "BP-1-A8889"
    const pattern = /^[1-5]{1}-[A-Z]{1}[0-9]{4}$/;

    if (pattern.test(this.vehicleNumber)) {
      // Valid vehicle number
      console.log('Valid vehicle number');
      errorMsg.innerHTML = '';
    } else {
      // Invalid vehicle number
      console.log('Invalid vehicle number');
      errorMsg.innerHTML = 'Invalid input format. Please enter a valid value.';
    }

    for (const position of hyphenPositions) {
      if (this.vehicleNumber.length === position && !hyphenAdded) {
        this.vehicleNumber += '-';
        hyphenAdded = true;
        break;
      }
    }
  }

  message = 'This modal example uses the modalController to present and dismiss modals.';
  async openModal() {
    const modal = await this.modalCtrl.create({
      component: AddPassangerComponent,
    }).then(modalE1 => {
      modalE1.present();
      return modalE1.onDidDismiss();
    }).then(data =>{
      console.log(data);
      if (data.role === 'confirm'){
        this.loadingCtrl
        .create({message:'booking place...'})
        .then(loadingE1 =>{
          loadingE1.present();
          const resData = data.data.bookingData;
          console.log(resData)
          this.passengerList.push(resData)
          this.addPassengerToggle=true
          // .subscribe(()=>{
          //   loadingE1.dismiss();
          // });
          loadingE1.dismiss();
        });
      }
    })
    console.log(this.addPassenger)
  }

  removePassenger(cid:any){
    this.passengerList.splice(cid)
  }
}
