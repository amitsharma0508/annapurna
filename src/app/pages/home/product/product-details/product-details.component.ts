import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { observable } from 'rxjs';
import { ImageService } from 'src/app/shared/image.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  id
  product:any
  constructor(private route:ActivatedRoute,private service: ImageService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
      console.log("id"+this.id)
      this.service.getGroceryById("t33qr").subscribe(data => {
        this.product = data;
        console.log("array"+this.product)
      });
    });
  }

}
