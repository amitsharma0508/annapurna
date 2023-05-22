
import { Component } from '@angular/core';
import { NavigationEnd, NavigationExtras, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ImageService } from './shared/image.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'teleport-project-template-angular';
  currentRoute: string;
  checkUrl:boolean=true;
  checkAuth:boolean = true;
  receivedData
  constructor(private router: Router, private service:ImageService,private location: Location){
  
  }
  ngOnInit(): void {
    const script1 = document.createElement('script');
  
    script1.src = 'assets/img/side-nav-toggle.js';

    document.head.appendChild(script1);
    this.service.getinsertGroceryDetails();
    this.service.getInsertCigarettesDetails();
    this.service.getDespicableVapeDetails();
    this.service.getElectronicDetails();
    this.service.getHealthAndBeautyDetails();
    this.service.getProduceDetails();
    this.service.getTobaccoDetails();
    this.service.getWareHouseDetails();
    this.service.getAccessoriesDetails();
    this.service.getHouseholdDetails();
    // detection of url and writing logic
    // start
    this.service.getDatas().subscribe((data) => {
      this.receivedData = data;
      console.log(this.receivedData + "recieved data")
    });
    this.router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd)
    ).subscribe((event: { url: string; }) => {
      this.currentRoute = event.url;          
      console.log(this.currentRoute);
      if(event.url == "/admin"){
          this.checkUrl=false;
     }else{
      this.checkUrl=true;
     }
    });
    //end
  
  }
  //dryGrocery function
  dryGrocery() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        param: "dryGrocery",
        type: "dryGrocery"
      }
    };
    this.router.navigate(['/product'], navigationExtras).then(() => {
      window.location.reload();
    });
  }

  //Cigarette function
  cigarette(){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        param: "cigarettes",
        type: "cigarettes"
      }
    };
    this.router.navigate(['/product'], navigationExtras).then(() => {
      window.location.reload();
    });
  }

  //despicableVape function
  despicableVape(){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        param: "despicableVape",
        type: "despicableVape"
      }
    };
    this.router.navigate(['/product'], navigationExtras).then(() => {
      window.location.reload();
    });
  }

  //electronic function
  electronic(){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        param: "electronic",
        type: "electronic"
      }
    };
    this.router.navigate(['/product'], navigationExtras).then(() => {
      window.location.reload();
    });
  }

  //health&Beauty function
  healthAndBeauty(){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        param: "healthAndBeauty",
        type: "healthAndBeauty"
      }
    };
    this.router.navigate(['/product'], navigationExtras).then(() => {
      window.location.reload();
    });
  }

  //produce function
  produce(){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        param: "produce",
        type: "produce"
      }
    };
    this.router.navigate(['/product'], navigationExtras).then(() => {
      window.location.reload();
    });
  }

  //tobacco function
  tobacco(){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        param: "tobacco",
        type: "tobacco"
      }
    };
    this.router.navigate(['/product'], navigationExtras).then(() => {
      window.location.reload();
    });
  }

  wareHouse(){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        param: "wareHouse",
        type: "wareHouse"
      }
    };
    this.router.navigate(['/product'], navigationExtras).then(() => {
      window.location.reload();
    });
  }

  accessories(){
    this.router.navigate(['']);
    let navigationExtras: NavigationExtras = {
      queryParams: {
        param: "accessories",
        type: "accessories"
      }
    };
    this.router.navigate(['/product'], navigationExtras).then(() => {
      window.location.reload();
    });
  }

  household(){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        param: "household",
        type: "household"
      }
    };
    this.router.navigate(['/product'], navigationExtras).then(() => {
      window.location.reload();
    });
  }
}