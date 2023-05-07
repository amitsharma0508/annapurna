import { Component, OnInit } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.page.html',
  styleUrls: ['./about-us.page.scss'],
})
export class AboutUsPage implements OnInit {

  constructor(
    private navCtrl: NavController,
    private callNumber: CallNumber
  ) { }

  ngOnInit() {
  }

  call(){
    this.callNumber.callNumber("1818", true)
    .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));
  }

  back() {
    this.navCtrl.navigateForward('/dashboard');
  }

}
