import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NekorPageRoutingModule } from './nekor-routing.module';

import { NekorPage } from './nekor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NekorPageRoutingModule
  ],
  declarations: [NekorPage]
})
export class NekorPageModule {}
