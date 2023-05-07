import { Component, OnInit } from '@angular/core';
import { NavController, PopoverController } from '@ionic/angular';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.page.html',
  styleUrls: ['./popover.page.scss'],
})
export class PopoverPage implements OnInit {

  constructor(
    private popOverCtrl: PopoverController,
    private navCtrl: NavController,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  profile() {
    this.navCtrl.navigateForward('/dashboard/profile');
    this.popOverCtrl.dismiss();
  }

  logout() {
    this.authService.logout();
    this.navCtrl.navigateForward('/login');
    this.popOverCtrl.dismiss();
  }

}
