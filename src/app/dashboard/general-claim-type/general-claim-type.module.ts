import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GeneralClaimTypePageRoutingModule } from './general-claim-type-routing.module';

import { GeneralClaimTypePage } from './general-claim-type.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GeneralClaimTypePageRoutingModule
  ],
  declarations: [GeneralClaimTypePage]
})
export class GeneralClaimTypePageModule {}
