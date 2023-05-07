import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DomesticTravelInsurancePage } from './domestic-travel-insurance.page';

const routes: Routes = [
  {
    path: '',
    component: DomesticTravelInsurancePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DomesticTravelInsurancePageRoutingModule {}
