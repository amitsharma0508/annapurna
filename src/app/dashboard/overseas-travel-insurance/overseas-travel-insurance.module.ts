import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OverseasTravelInsurancePageRoutingModule } from './overseas-travel-insurance-routing.module';

import { OverseasTravelInsurancePage } from './overseas-travel-insurance.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OverseasTravelInsurancePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [OverseasTravelInsurancePage]
})
export class OverseasTravelInsurancePageModule {}
