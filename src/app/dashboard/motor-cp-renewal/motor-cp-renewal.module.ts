import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MotorCpRenewalPageRoutingModule } from './motor-cp-renewal-routing.module';

import { MotorCpRenewalPage } from './motor-cp-renewal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MotorCpRenewalPageRoutingModule
  ],
  declarations: [MotorCpRenewalPage]
})
export class MotorCpRenewalPageModule {}
