import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GeneralRenewalOthersPageRoutingModule } from './general-renewal-others-routing.module';

import { GeneralRenewalOthersPage } from './general-renewal-others.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GeneralRenewalOthersPageRoutingModule
  ],
  declarations: [GeneralRenewalOthersPage]
})
export class GeneralRenewalOthersPageModule {}
