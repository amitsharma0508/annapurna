import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnnuitySchemeDetailsPageRoutingModule } from './annuity-scheme-details-routing.module';

import { AnnuitySchemeDetailsPage } from './annuity-scheme-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnnuitySchemeDetailsPageRoutingModule
  ],
  declarations: [AnnuitySchemeDetailsPage]
})
export class AnnuitySchemeDetailsPageModule {}
