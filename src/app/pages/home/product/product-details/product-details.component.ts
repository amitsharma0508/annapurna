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
  constructor(private route:ActivatedRoute,private service: ImageService) { }

  ngOnInit(): void {
    const script1 = document.createElement('script');
  
    script1.src = 'assets/img/side-nav-toggle.js';

    document.head.appendChild(script1);
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.service.groceryDetails.snapshotChanges().subscribe(
        list => {
          this.imageList = list.map(item => item.payload.val());
          this.product = this.imageList.filter(item => item.id === id);
          console.log(this.product, "product");
          // Rest of your code that relies on the filtered product details
        }
      );
      this.service.cigarettesDetails.snapshotChanges().subscribe(
        list => {
          this.imageList = list.map(item => item.payload.val());
          this.product = this.imageList.filter(item => item.id === id);
          console.log(this.product, "product");
          // Rest of your code that relies on the filtered product details
        }
      );
      this.service.accessoriesDetails.snapshotChanges().subscribe(
        list => {
          this.imageList = list.map(item => item.payload.val());
          this.product = this.imageList.filter(item => item.id === id);
          console.log(this.product, "product");
          // Rest of your code that relies on the filtered product details
        }
      );
      this.service.despicableVapeDetails.snapshotChanges().subscribe(
        list => {
          this.imageList = list.map(item => item.payload.val());
          this.product = this.imageList.filter(item => item.id === id);
          console.log(this.product, "product");
          // Rest of your code that relies on the filtered product details
        }
      );
      this.service.electronicDetails.snapshotChanges().subscribe(
        list => {
          this.imageList = list.map(item => item.payload.val());
          this.product = this.imageList.filter(item => item.id === id);
          console.log(this.product, "product");
          // Rest of your code that relies on the filtered product details
        }
      );
      this.service.healthAndBeautyDetails.snapshotChanges().subscribe(
        list => {
          this.imageList = list.map(item => item.payload.val());
          this.product = this.imageList.filter(item => item.id === id);
          console.log(this.product, "product");
          // Rest of your code that relies on the filtered product details
        }
      );
      this.service.produceDetails.snapshotChanges().subscribe(
        list => {
          this.imageList = list.map(item => item.payload.val());
          this.product = this.imageList.filter(item => item.id === id);
          console.log(this.product, "product");
          // Rest of your code that relies on the filtered product details
        }
      );
      this.service.tobaccoDetails.snapshotChanges().subscribe(
        list => {
          this.imageList = list.map(item => item.payload.val());
          this.product = this.imageList.filter(item => item.id === id);
          console.log(this.product, "product");
          // Rest of your code that relies on the filtered product details
        }
      );
      this.service.wareHouseDetails.snapshotChanges().subscribe(
        list => {
          this.imageList = list.map(item => item.payload.val());
          this.product = this.imageList.filter(item => item.id === id);
          console.log(this.product, "product");
          // Rest of your code that relies on the filtered product details
        }
      );
      
    });
  }

}
