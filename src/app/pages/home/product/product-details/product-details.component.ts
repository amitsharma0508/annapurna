import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { observable } from 'rxjs';
import { ImageService } from 'src/app/shared/image.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  id
  product:any
  imageList:any
  param:any;
  constructor(private route:ActivatedRoute,private service: ImageService) { }
   
   currentUserEmail:any;


  ngOnInit(): void {
    const script1 = document.createElement('script');
  
    script1.src = 'assets/img/side-nav-toggle.js';

    document.head.appendChild(script1);
    this.route.queryParams.subscribe(params => {
      this.param = params['param'];
      this.currentUserEmail = params['email']
      console.log(this.currentUserEmail + "currentuseremail")
    });
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if(this.param == "dryGrocery"){
        this.service.groceryDetails.snapshotChanges().subscribe(
          list => {
            this.imageList = list.map(item => item.payload.val());
            this.product = this.imageList.filter(item => item.id === id);
            console.log(this.product, "product");
            // Rest of your code that relies on the filtered product details
          }
        );
      }

      if(this.param == "accessories"){
        console.log(this.currentUserEmail + "currentuseremail")
        this.service.accessoriesDetails.snapshotChanges().subscribe(
          list => {
            this.imageList = list.map(item => item.payload.val());
            this.product = this.imageList.filter(item => item.id === id);
            console.log(this.product, "product");
            // Rest of your code that relies on the filtered product details
          }
        );
      }
      if(this.param == "cigarettes"){
        this.service.cigarettesDetails.snapshotChanges().subscribe(
          list => {
            this.imageList = list.map(item => item.payload.val());
            this.product = this.imageList.filter(item => item.id === id);
            console.log(this.product, "product");
            // Rest of your code that relies on the filtered product details
          }
        );
      }
      if(this.param == "despicableVape"){
    
        this.service.despicableVapeDetails.snapshotChanges().subscribe(
          list => {
            this.imageList = list.map(item => item.payload.val());
            this.product = this.imageList.filter(item => item.id === id);
            console.log(this.product, "product");
            // Rest of your code that relies on the filtered product details
          }
        );
      }
      if(this.param == "electronic"){
        this.service.electronicDetails.snapshotChanges().subscribe(
          list => {
            this.imageList = list.map(item => item.payload.val());
            this.product = this.imageList.filter(item => item.id === id);
            console.log(this.product, "product");
            // Rest of your code that relies on the filtered product details
          }
        );
      }
      if(this.param == "healthAndBeauty"){
        this.service.healthAndBeautyDetails.snapshotChanges().subscribe(
          list => {
            this.imageList = list.map(item => item.payload.val());
            this.product = this.imageList.filter(item => item.id === id);
            console.log(this.product, "product");
            // Rest of your code that relies on the filtered product details
          }
        );
      }
      if(this.param == "produce"){
        this.service.produceDetails.snapshotChanges().subscribe(
          list => {
            this.imageList = list.map(item => item.payload.val());
            this.product = this.imageList.filter(item => item.id === id);
            console.log(this.product, "product");
            // Rest of your code that relies on the filtered product details
          }
        );
      }
      if(this.param == "tobacco"){
        this.service.tobaccoDetails.snapshotChanges().subscribe(
          list => {
            this.imageList = list.map(item => item.payload.val());
            this.product = this.imageList.filter(item => item.id === id);
            console.log(this.product, "product");
            // Rest of your code that relies on the filtered product details
          }
        );
      }
      if(this.param == "wareHouse"){
        this.service.wareHouseDetails.snapshotChanges().subscribe(
          list => {
            this.imageList = list.map(item => item.payload.val());
            this.product = this.imageList.filter(item => item.id === id);
            console.log(this.product, "product");
            // Rest of your code that relies on the filtered product details
          }
        );
      }
      if(this.param == "household"){
        this.service.householdDetails.snapshotChanges().subscribe(
          list => {
            this.imageList = list.map(item => item.payload.val());
            this.product = this.imageList.filter(item => item.id === id);
            console.log(this.product, "product");
            // Rest of your code that relies on the filtered product details
          }
        );
      }
    });
  }



  addToCart(product: any): void {
    console.log(product + "product")
  this.service.addToCart(product, this.currentUserEmail)
    .then(() => {
      // Item added to cart successfully
      console.log("Item added to cart successfully")
    })
    .catch(error => {
      console.log('Error adding item to cart:', error);
    });
     
  }
}
