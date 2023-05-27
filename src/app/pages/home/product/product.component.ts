import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ImageService } from 'src/app/shared/image.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  param!: string;
  testToggle:boolean=false;
  imageList: any[];
  rowIndexArray: any[];
  searchTerm: string; // New property for the search term
  filterProducts(): any[] {
    if (!this.searchTerm) {
      return this.imageList;
    }
    const searchTerm = this.searchTerm.toLowerCase();
    return this.imageList.filter(item => item.productName.toLowerCase().includes(searchTerm));
  }
  constructor(private route: ActivatedRoute,private service: ImageService, private router: Router) { }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.param = params['param'];
      this.fetchDataBasedOnParam();
    });


  }
  fetchDataBasedOnParam() {
    if(this.param == 'dryGrocery'){
      this.service.groceryDetails.snapshotChanges().subscribe(
       list => {
         this.imageList = list.map(item => { return item.payload.val(); });
         this.rowIndexArray =  Array.from(Array(Math.ceil((this.imageList.length+1) / 3)).keys());
       }
     );
     }
     if(this.param == 'cigarettes'){
       this.service.cigarettesDetails.snapshotChanges().subscribe(
        list => {
          this.imageList = list.map(item => { return item.payload.val(); });
          this.rowIndexArray =  Array.from(Array(Math.ceil((this.imageList.length+1) / 3)).keys());
        }
      );
     }
     if(this.param == 'despicableVape'){
       this.service.despicableVapeDetails.snapshotChanges().subscribe(
        list => {
          this.imageList = list.map(item => { return item.payload.val(); });
          this.rowIndexArray =  Array.from(Array(Math.ceil((this.imageList.length+1) / 3)).keys());
        }
      );
     }
     if(this.param == 'electronic'){
       this.service.electronicDetails.snapshotChanges().subscribe(
        list => {
          this.imageList = list.map(item => { return item.payload.val(); });
          this.rowIndexArray =  Array.from(Array(Math.ceil((this.imageList.length+1) / 3)).keys());
        }
      );
     }
     if(this.param == 'healthAndBeauty'){
       this.service.healthAndBeautyDetails.snapshotChanges().subscribe(
        list => {
          this.imageList = list.map(item => { return item.payload.val(); });
          this.rowIndexArray =  Array.from(Array(Math.ceil((this.imageList.length+1) / 3)).keys());
        }
      );
     }
     if(this.param == 'produce'){
       this.service.produceDetails.snapshotChanges().subscribe(
        list => {
          this.imageList = list.map(item => { return item.payload.val(); });
          this.rowIndexArray =  Array.from(Array(Math.ceil((this.imageList.length+1) / 3)).keys());
        }
      );
     }
     if(this.param == 'tobacco'){
       this.service.tobaccoDetails.snapshotChanges().subscribe(
        list => {
          this.imageList = list.map(item => { return item.payload.val(); });
          this.rowIndexArray =  Array.from(Array(Math.ceil((this.imageList.length+1) / 3)).keys());
        }
      );
     }
     if(this.param == 'wareHouse'){
       this.service.wareHouseDetails.snapshotChanges().subscribe(
        list => {
          this.imageList = list.map(item => { return item.payload.val(); });
          this.rowIndexArray =  Array.from(Array(Math.ceil((this.imageList.length+1) / 3)).keys());
        }
      );
     }
     if(this.param == 'accessories'){
       this.service.accessoriesDetails.snapshotChanges().subscribe(
        list => {
          this.imageList = list.map(item => { return item.payload.val(); });
          this.rowIndexArray =  Array.from(Array(Math.ceil((this.imageList.length+1) / 3)).keys());
        }
      );
     }
     if(this.param == 'household'){
       this.service.householdDetails.snapshotChanges().subscribe(
        list => {
          this.imageList = list.map(item => { return item.payload.val(); });
          this.rowIndexArray =  Array.from(Array(Math.ceil((this.imageList.length+1) / 3)).keys());
        }
      );
     }
  }

  redirect(id:any){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        param: this.param,
        type: this.param,
      }
    };
    this.router.navigate(['/product', id],navigationExtras);
  }

}
