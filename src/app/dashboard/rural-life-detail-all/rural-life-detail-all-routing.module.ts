import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RuralLifeDetailAllPage } from './rural-life-detail-all.page';

const routes: Routes = [
  {
    path: '',
    component: RuralLifeDetailAllPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RuralLifeDetailAllPageRoutingModule {}
