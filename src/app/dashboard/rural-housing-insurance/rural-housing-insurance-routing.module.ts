import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RuralHousingInsurancePage } from './rural-housing-insurance.page';

const routes: Routes = [
  {
    path: '',
    component: RuralHousingInsurancePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RuralHousingInsurancePageRoutingModule {}
