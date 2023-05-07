import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  constructor(private route: ActivatedRoute,private service: ImageService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.param = params['param'];
    });

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
  }

}
