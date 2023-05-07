import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RuralLifeMembersPage } from './rural-life-members.page';

const routes: Routes = [
  {
    path: '',
    component: RuralLifeMembersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RuralLifeMembersPageRoutingModule {}
