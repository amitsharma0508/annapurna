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
import { LoginComponent } from "./login/login.component";
import { AccessoriesComponent } from "./admin/accessories/accessories.component";
import { WarehouseComponent } from "./admin/warehouse/warehouse.component";
import { HouseholdComponent } from "./admin/household/household.component";
import { CartComponent } from "./cart/cart.component";
import { FeaturedProductComponent } from "./admin/featured-product/featured-product.component";
import { TrendingProductComponent } from "./admin/trending-product/trending-product.component";
import { TrendingProuct1Component } from "./admin/trending-prouct1/trending-prouct1.component";
import { TrendingProuct2Component } from "./admin/trending-prouct2/trending-prouct2.component";
import { TrendingProuct3Component } from "./admin/trending-prouct3/trending-prouct3.component";
import { TrendingProuct4Component } from "./admin/trending-prouct4/trending-prouct4.component";

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
    path:'login',
    component:LoginComponent
  },
  {
    path:'product',
    children:[
      {
        path:'',
        component:ProductComponent
      },
      {
        path:':id',
        component:ProductDetailsComponent
      }
    ]
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
    path:'cart',
    component:CartComponent
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
    ProductDetailsComponent,
    LoginComponent,
    AccessoriesComponent,
    WarehouseComponent,
    HouseholdComponent,
    CartComponent,
    FeaturedProductComponent,
    TrendingProductComponent,
    TrendingProuct1Component,
    TrendingProuct2Component,
    TrendingProuct3Component,
    TrendingProuct4Component
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
