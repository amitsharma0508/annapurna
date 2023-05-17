
import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ImageService } from './shared/image.service';

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
  constructor(private router: Router, private service:ImageService){
  
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
    // detection of url and writing logic
    // start
    this.service.getDatas().subscribe((data) => {
      this.receivedData = data;
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
}