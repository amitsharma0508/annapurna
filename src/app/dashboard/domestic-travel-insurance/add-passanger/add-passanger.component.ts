import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
interface passengerDetails{
  cid:number;
  fullName:string;
  phoneNo:string;
}
@Component({
  selector: 'app-add-passanger',
  templateUrl: './add-passanger.component.html',
  styleUrls: ['./add-passanger.component.scss'],
})
export class AddPassangerComponent  implements OnInit {

  name!: string;
  @ViewChild('f') form!:NgForm;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    if(!this.form.valid){
      return;
    }
    this.modalCtrl.dismiss(
      {
        bookingData: {
        cid: this.form.value['cid'],
        fullName: this.form.value['fullName'],
        phone: this.form.value['phone']
       }
      },
      'confirm'
      );
      console.log(this.form.value)
  }
}
