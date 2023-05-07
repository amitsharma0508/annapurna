import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LifeDetailPage } from './life-detail.page';

const routes: Routes = [
  {
    path: '',
    component: LifeDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LifeDetailPageRoutingModule {}
