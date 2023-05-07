import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GeneralClaimOthersPageRoutingModule } from './general-claim-others-routing.module';

import { GeneralClaimOthersPage } from './general-claim-others.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GeneralClaimOthersPageRoutingModule
  ],
  declarations: [GeneralClaimOthersPage]
})
export class GeneralClaimOthersPageModule {}
