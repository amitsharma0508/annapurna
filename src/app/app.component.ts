
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
  constructor(private router: Router, private service:ImageService){
  
  }
  ngOnInit(): void {
    this.service.getinsertGroceryDetails();
    this.service.getInsertCigarettesDetails();
    this.service.getDespicableVapeDetails();
    this.service.getElectronicDetails();
    this.service.getHealthAndBeautyDetails();
    this.service.getProduceDetails();
    this.service.getTobaccoDetails();
    // detection of url and writing logic
    // start
    this.router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd)
    ).subscribe((event: { url: string; }) => {
      this.currentRoute = event.url;          
      console.log(this.currentRoute);
      if(event.url == "/admin"){
        this.checkUrl=false;
        console.log(this.checkUrl)
     }else{
      this.checkUrl=true;
      console.log(this.checkUrl)
     }
    });
    //end
  
  }
}