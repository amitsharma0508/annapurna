import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BrowserModule } from "@angular/platform-browser";

import { ComponentsModule } from "./components/components.module";
import { AppComponent } from "./app.component";
import { ImagesComponent } from "./images/images.component";
import { ImageComponent } from "./images/image/image.component";
import { ImageListComponent } from "./images/image-list/image-list.component";
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireStorageModule } from "@angular/fire/compat/storage";
import { AngularFireDatabaseModule } from "@angular/fire/compat/database";
import { environment } from "src/environments/environment";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AdminComponent } from "./admin/admin.component";
import { ProductComponent } from "./pages/home/product/product.component";
import { DryGroceryComponent } from "./admin/dry-grocery/dry-grocery.component";
import { CigaretComponent } from "./admin/cigaret/cigaret.component";
import { DespicableVapeComponent } from "./admin/despicable-vape/despicable-vape.component";
import { ElectronicComponent } from "./admin/electronic/electronic.component";
import { HealthAndBeautyComponent } from "./admin/health-and-beauty/health-and-beauty.component";
import { ProduceComponent } from "./admin/produce/produce.component";
import { TobaccoComponent } from "./admin/tobacco/tobacco.component";
import { HttpClientModule } from  '@angular/common/http';
import { ProductDetailsComponent } from "./pages/home/product/product-details/product-details.component";

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'admin',
    component:AdminComponent
  },
  {
    path:'product',
    component:ProductComponent
  },
  // {path:'', redirectTo:'image/upload', pathMatch:'full'},
  {
    path: "image",
    component: ImagesComponent,
    children: [
      { path: "upload", component: ImageComponent },
      { path: "list", component: ImageListComponent },
    ],
  },
  {
    path:'details',
    component:ProductDetailsComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    ImagesComponent,
    ImageComponent,
    ImageListComponent,
    AdminComponent,
    ProductComponent,
    DryGroceryComponent,
    CigaretComponent,
    DespicableVapeComponent,
    ElectronicComponent,
    HealthAndBeautyComponent,
    ProduceComponent,
    TobaccoComponent,
    ProductDetailsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    ComponentsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
