import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GeneralInsuranceDocumentPage } from './general-insurance-document.page';

const routes: Routes = [
  {
    path: '',
    component: GeneralInsuranceDocumentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeneralInsuranceDocumentPageRoutingModule {}
