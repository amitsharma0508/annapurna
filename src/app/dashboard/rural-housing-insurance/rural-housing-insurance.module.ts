import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RuralHousingInsurancePageRoutingModule } from './rural-housing-insurance-routing.module';

import { RuralHousingInsurancePage } from './rural-housing-insurance.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RuralHousingInsurancePageRoutingModule
  ],
  declarations: [RuralHousingInsurancePage]
})
export class RuralHousingInsurancePageModule {}
