import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { AlertController, NavController } from '@ionic/angular';
import { DataService } from 'src/app/core/data.service';

@Component({
  selector: 'app-business-detail',
  templateUrl: './business-detail.page.html',
  styleUrls: ['./business-detail.page.scss'],
})
export class BusinessDetailPage implements OnInit {
  status!: string;
  message!: string;
  css!: string;
  businessData!: [];
  id!: number;
  title!: string;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private callNumber: CallNumber
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.id = params['param'];
      this.title = params['title'];
    });

    this.getBusinessDetailById();
  }

  //getBusinessDetailById Function
  getBusinessDetailById(){
    // this.dataService.getLineOfBusinessById(this.id).then(res => {
    //   let response = res.data;
    //   if(response === '') {
    //     this.status = 'Warning';
    //     this.message = 'No data available';
    //     this.css = 'alert-warning';
    //     this.presentAlert();
    //   } else {
    //     this.businessData = JSON.parse(response);
    //   }
    // }).catch(() => {
    //   this.status = 'Error';
    //   this.message = 'Failed to load details, please try again later';
    //   this.css = 'alert-error';
    //   this.presentAlert();
    // });
  }

  //call function
  call(){
    this.callNumber.callNumber("1818", true)
    .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));
  }

  //back function
  back() {
    this.navCtrl.navigateForward('/business');
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

}
