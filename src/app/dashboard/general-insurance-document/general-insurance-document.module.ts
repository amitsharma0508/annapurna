import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GeneralInsuranceDocumentPageRoutingModule } from './general-insurance-document-routing.module';

import { GeneralInsuranceDocumentPage } from './general-insurance-document.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GeneralInsuranceDocumentPageRoutingModule
  ],
  declarations: [GeneralInsuranceDocumentPage]
})
export class GeneralInsuranceDocumentPageModule {}
