import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DomesticTravelInsurancePageRoutingModule } from './domestic-travel-insurance-routing.module';

import { DomesticTravelInsurancePage } from './domestic-travel-insurance.page';
import { AddPassangerComponent } from './add-passanger/add-passanger.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DomesticTravelInsurancePageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [DomesticTravelInsurancePage,AddPassangerComponent]
})
export class DomesticTravelInsurancePageModule {}
