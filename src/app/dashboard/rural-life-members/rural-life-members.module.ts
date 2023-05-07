import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RuralLifeMembersPageRoutingModule } from './rural-life-members-routing.module';

import { RuralLifeMembersPage } from './rural-life-members.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RuralLifeMembersPageRoutingModule
  ],
  declarations: [RuralLifeMembersPage]
})
export class RuralLifeMembersPageModule {}
