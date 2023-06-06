import { Component } from '@angular/core'
import { Title, Meta } from '@angular/platform-browser'
import { NavigationExtras, Router } from '@angular/router';
import { ImageService } from 'src/app/shared/image.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css', 'home.component.scss'],
})
export class Home {
  raw0cip: string = ' '
  emailService: any;
  imageList: any[];
  imageLists: any[];
  rowIndexArray: any[];

  items = [
    {
      name: "Rice Cooker(1.5Ltrs)",
      value: "25",
      image_src: "assets/img6.jpg",
      rootClassName: "rootClassName4"
    },
    
    // Add more items as needed
  ];

  constructor(private title: Title, private meta: Meta,private router: Router,private service: ImageService) {
    this.title.setTitle('Mobillio Online Store')
    this.meta.addTags([
      {
        property: 'og:title',
        content: 'Mobillio Online Store',
      },
    ])

  }
  ngOnInit(){
 
    const script1 = document.createElement('script');
 
    script1.src = 'assets/javascript.js';
  
    document.head.appendChild(script1);

    this.service.featuredDetails.snapshotChanges().subscribe(
      list => {
        this.imageList = list.map(item => { return item.payload.val(); });
        // this.rowIndexArray =  Array.from(Array(Math.ceil((this.imageList.length+1) / 3)).keys());
      }
    )

    this.service.trendingProductsDetails.snapshotChanges().subscribe(
      list => {
        this.imageLists = list.map(item => { return item.payload.val(); });
        // this.rowIndexArray =  Array.from(Array(Math.ceil((this.imageList.length+1) / 3)).keys());
      }
    )
    
    console.log(this.imageList)
   }

  //dryGrocery function
  dryGrocery() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        param: "dryGrocery",
        type: "dryGrocery"
      }
    };
    this.router.navigate(['/product'], navigationExtras);
  }

  //Cigarette function
  cigarette(){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        param: "cigarettes",
        type: "cigarettes"
      }
    };
    this.router.navigate(['/product'], navigationExtras);
  }

  //despicableVape function
  despicableVape(){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        param: "despicableVape",
        type: "despicableVape"
      }
    };
    this.router.navigate(['/product'], navigationExtras);
  }

  //electronic function
  electronic(){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        param: "electronic",
        type: "electronic"
      }
    };
    this.router.navigate(['/product'], navigationExtras);
  }

  //health&Beauty function
  healthAndBeauty(){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        param: "healthAndBeauty",
        type: "healthAndBeauty"
      }
    };
    this.router.navigate(['/product'], navigationExtras);
  }

  //produce function
  produce(){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        param: "produce",
        type: "produce"
      }
    };
    this.router.navigate(['/product'], navigationExtras);
  }

  //tobacco function
  tobacco(){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        param: "tobacco",
        type: "tobacco"
      }
    };
    this.router.navigate(['/product'], navigationExtras);
  }

  wareHouse(){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        param: "wareHouse",
        type: "wareHouse"
      }
    };
    this.router.navigate(['/product'], navigationExtras);
  }

  accessories(){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        param: "accessories",
        type: "accessories"
      }
    };
    this.router.navigate(['/product'], navigationExtras);
  }

  household(){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        param: "household",
        type: "household"
      }
    };
    this.router.navigate(['/product'], navigationExtras);
  }
}
