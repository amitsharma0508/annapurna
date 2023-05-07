import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FireSfRenewalDetailPageRoutingModule } from './fire-sf-renewal-detail-routing.module';

import { FireSfRenewalDetailPage } from './fire-sf-renewal-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FireSfRenewalDetailPageRoutingModule
  ],
  declarations: [FireSfRenewalDetailPage]
})
export class FireSfRenewalDetailPageModule {}
