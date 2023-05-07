import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GeneralInsuranceTypeOthersPageRoutingModule } from './general-insurance-type-others-routing.module';

import { GeneralInsuranceTypeOthersPage } from './general-insurance-type-others.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GeneralInsuranceTypeOthersPageRoutingModule
  ],
  declarations: [GeneralInsuranceTypeOthersPage]
})
export class GeneralInsuranceTypeOthersPageModule {}
