import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MotorTpRenewalDetailPageRoutingModule } from './motor-tp-renewal-detail-routing.module';

import { MotorTpRenewalDetailPage } from './motor-tp-renewal-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MotorTpRenewalDetailPageRoutingModule
  ],
  declarations: [MotorTpRenewalDetailPage]
})
export class MotorTpRenewalDetailPageModule {}
