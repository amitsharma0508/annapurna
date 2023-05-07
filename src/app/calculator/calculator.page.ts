import { Component, OnInit } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.page.html',
  styleUrls: ['./calculator.page.scss'],
})
export class CalculatorPage implements OnInit {

  creditCalculator: boolean = false;
  installmentCalculator: boolean = false;
  interestCalculator: boolean = false;

  constructor(
    private navCtrl: NavController,
    private callNumber: CallNumber
  ) { }

  ngOnInit() {
  }

  call() {
    this.callNumber.callNumber("1818", true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }

  back() {
    this.navCtrl.navigateForward('/dashboard');
  }

  openCalculator(caltype: any) {
    if (caltype == "credit") {
      this.creditCalculator = true;
      this.installmentCalculator = false;
      this.interestCalculator = false;
    }
    if (caltype == "installment") {
      this.installmentCalculator = true;
      this.creditCalculator = false;
      this.interestCalculator = false;
    }
    if (caltype == "interest") {
      this.interestCalculator = true;
      this.creditCalculator = false;
      this.installmentCalculator = false;
    }
  }


}
