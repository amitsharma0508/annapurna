import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RuralLifeDetailAllPageRoutingModule } from './rural-life-detail-all-routing.module';

import { RuralLifeDetailAllPage } from './rural-life-detail-all.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RuralLifeDetailAllPageRoutingModule
  ],
  declarations: [RuralLifeDetailAllPage]
})
export class RuralLifeDetailAllPageModule {}
