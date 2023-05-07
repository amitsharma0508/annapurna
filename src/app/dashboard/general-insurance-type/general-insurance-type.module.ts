import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GeneralInsuranceTypePageRoutingModule } from './general-insurance-type-routing.module';

import { GeneralInsuranceTypePage } from './general-insurance-type.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GeneralInsuranceTypePageRoutingModule
  ],
  declarations: [GeneralInsuranceTypePage]
})
export class GeneralInsuranceTypePageModule {}
