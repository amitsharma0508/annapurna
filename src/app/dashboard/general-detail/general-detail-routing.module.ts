import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GeneralDetailPage } from './general-detail.page';

const routes: Routes = [
  {
    path: '',
    component: GeneralDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeneralDetailPageRoutingModule {}
