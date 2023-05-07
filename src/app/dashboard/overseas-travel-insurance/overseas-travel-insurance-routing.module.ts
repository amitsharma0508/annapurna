import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OverseasTravelInsurancePage } from './overseas-travel-insurance.page';

const routes: Routes = [
  {
    path: '',
    component: OverseasTravelInsurancePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OverseasTravelInsurancePageRoutingModule {}
