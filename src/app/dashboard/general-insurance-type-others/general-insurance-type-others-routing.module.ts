import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GeneralInsuranceTypeOthersPage } from './general-insurance-type-others.page';

const routes: Routes = [
  {
    path: '',
    component: GeneralInsuranceTypeOthersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeneralInsuranceTypeOthersPageRoutingModule {}
