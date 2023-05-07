import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GeneralClaimPageRoutingModule } from './general-claim-routing.module';

import { GeneralClaimPage } from './general-claim.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GeneralClaimPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [GeneralClaimPage]
})
export class GeneralClaimPageModule {}
