import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FireSfRenewalPageRoutingModule } from './fire-sf-renewal-routing.module';

import { FireSfRenewalPage } from './fire-sf-renewal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FireSfRenewalPageRoutingModule
  ],
  declarations: [FireSfRenewalPage]
})
export class FireSfRenewalPageModule {}
