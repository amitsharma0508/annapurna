import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImmediateDetailPage } from './immediate-detail.page';

const routes: Routes = [
  {
    path: '',
    component: ImmediateDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImmediateDetailPageRoutingModule {}
