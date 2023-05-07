import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, LoadingController, ModalController, PopoverController } from '@ionic/angular';
import { PopoverPage } from 'src/app/component/popover/popover.page';
import { AddPassangerComponent } from '../domestic-travel-insurance/add-passanger/add-passanger.component';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-nekor',
  templateUrl: './nekor.page.html',
  styleUrls: ['./nekor.page.scss'],
})
export class NekorPage implements OnInit {
   addPassengerToggle:boolean=false;
   tourOperatorRegistered!:boolean;
   IfPlaceIsAdded:boolean=false;
   passengerList:any=[]
   placeAddedList:any=[]
   @ViewChild('f') form!:NgForm;
    @ViewChild('PlaceForm') PlaceForm!:NgForm;
    ifPlaceOfVisitIsOthers:boolean=false;
    ifPlaceOfVisitIsBhutan:boolean=false;
  constructor( private popoverController: PopoverController,private alertController: AlertController,
    private modalCtrl: ModalController, private loadingCtrl:LoadingController,) { }


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
addPassenger(){
  if(this.addPassengerToggle === false){
    this.addPassengerToggle = true;
  }else{
    this.addPassengerToggle = false;
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
searchTourOperator(){
  const licenseNo = "123456"
  console.log(this.form.value)
  if(this.form.value['tourOperatorLicenseNo'] == licenseNo){
    this.tourOperatorRegistered = true;
  }else{
    this.tourOperatorRegistered = false;
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

addPlaceToVisit(){
  console.log(this.PlaceForm.value['placeName'])
  let nameOfPlace=''
  this.placeAddedList.push(nameOfPlace=this.PlaceForm.value['placeName'])
  this.IfPlaceIsAdded = true
  this.PlaceForm.reset()
}
removePlace(name:any){
  console.log(name)
  this.placeAddedList.splice(name.placeName)
}

onPlaceOfVisitChange(event: any) {
  if (event.target.value === 'Bhutan') {
    this.ifPlaceOfVisitIsBhutan = true;
    this.ifPlaceOfVisitIsOthers = false;
  } else if (event.target.value === 'Others') {
    this.ifPlaceOfVisitIsBhutan = false;
    this.ifPlaceOfVisitIsOthers = true;
  }
}
}
