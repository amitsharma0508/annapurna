import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GeneralInsuranceTypePage } from './general-insurance-type.page';

const routes: Routes = [
  {
    path: '',
    component: GeneralInsuranceTypePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeneralInsuranceTypePageRoutingModule {}
