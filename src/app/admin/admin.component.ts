import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ImageService } from '../shared/image.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  @ViewChild('form') form!:NgForm;
  wholeDisplay:boolean=false
  param!: string;
  type!:number;
  dryGroceryToggle:boolean=true;
  cigaretToggle:boolean=false;
  despicableVapeToggle:boolean=false;
  electronicToggle:boolean=false;
  healthAndBeautyToggle:boolean=false;
  produceToggle:boolean=false;
  tobacco:boolean=false;
  receivedData:any
  receivedData2:number
  toggleActive = false;
  wareHouseToggle =false;
  accessoriesToggle=false;
  householdToggle=false;
  featuredToggle=false;
  trendingToggle=false;
  trendingToggle1=false;
  trendingToggle2=false;
  trendingToggle3=false;
  trendingToggle4=false;
  toggleMenu() {
    this.toggleActive = !this.toggleActive;
  }

  constructor(private route: ActivatedRoute, private dataService:ImageService) { }

  ngOnInit(){

      const script1 = document.createElement('script');
  
      script1.src = 'assets/img/side-nav-toggle.js';
  
      document.head.appendChild(script1);
      this.wholeDisplay=false
    //   this.dataService.getDatas().subscribe((data) => {
    //     this.receivedData = data;
    //   });
    //   this.route.queryParams.subscribe(params => {
    //     this.param = params['param'];
    //     this.type = params['type']
    //   });
      
 
    //   console.log(this.type + "type " + this.receivedData + "recieved")
    // if(this.type == this.type){
    //   this.wholeDisplay=true
    //   console.log(this.wholeDisplay)
    // }
   
  }
  login(){
    this.wholeDisplay = true;
  }
  dryGroceryToggleFunction(){
    this.dryGroceryToggle=true;
    this.cigaretToggle=false;
    this.despicableVapeToggle=false;
    this.electronicToggle=false;
    this.healthAndBeautyToggle=false;
    this.produceToggle=false;
    this.wareHouseToggle=false;
    this.accessoriesToggle=false;
    this.tobacco=false;
    this.householdToggle=false;
    this.trendingToggle2=false;
    this.trendingToggle3=false;
    this.trendingToggle4=false;
    this.featuredToggle=false;
    this.trendingToggle=false;
    this.trendingToggle1=false;
    console.log("trigerred")
  }
  cigaretToggleFunction(){
    this.dryGroceryToggle=false;
    this.cigaretToggle=true;
    this.despicableVapeToggle=false;
    this.electronicToggle=false;
    this.healthAndBeautyToggle=false;
    this.produceToggle=false;
    this.tobacco=false;
    this.wareHouseToggle=false;
    this.accessoriesToggle=false;
    this.featuredToggle=false;
    this.householdToggle=false;
    this.trendingToggle1=false;
    this.trendingToggle=false;
    this.trendingToggle2=false;
    this.trendingToggle3=false;
    this.trendingToggle4=false;
    console.log("trigerred oooooooo")
  }
  despicableVapeToggleFunction(){
    this.dryGroceryToggle=false;
    this.cigaretToggle=false;
    this.despicableVapeToggle=true;
    this.electronicToggle=false;
    this.healthAndBeautyToggle=false;
    this.produceToggle=false;
    this.wareHouseToggle=false;
    this.accessoriesToggle=false;
    this.householdToggle=false;
    this.featuredToggle=false;
    this.tobacco=false;
    this.trendingToggle2=false;
    this.trendingToggle3=false;
    this.trendingToggle4=false;
    this.trendingToggle1=false;
    this.trendingToggle=false;
  }
  electronicToggleFunction(){
    this.dryGroceryToggle=false;
    this.cigaretToggle=false;
    this.despicableVapeToggle=false;
    this.electronicToggle=true;
    this.healthAndBeautyToggle=false;
    this.produceToggle=false;
    this.wareHouseToggle=false;
    this.accessoriesToggle=false;
    this.householdToggle=false;
    this.featuredToggle=false;
    this.tobacco=false;
    this.trendingToggle1=false;
    this.trendingToggle=false;
    this.trendingToggle2=false;
    this.trendingToggle3=false;
    this.trendingToggle4=false;
  }
  healthAndBeautyToggleFunction(){
    this.dryGroceryToggle=false;
    this.cigaretToggle=false;
    this.despicableVapeToggle=false;
    this.electronicToggle=false;
    this.healthAndBeautyToggle=true;
    this.produceToggle=false;
    this.wareHouseToggle=false;
    this.accessoriesToggle=false;
    this.householdToggle=false;
    this.featuredToggle=false;
    this.tobacco=false;
    this.trendingToggle2=false;
    this.trendingToggle3=false;
    this.trendingToggle4=false;
    this.trendingToggle1=false;
    this.trendingToggle=false;
  }
  produceToggleFunction(){
    this.dryGroceryToggle=false;
    this.cigaretToggle=false;
    this.despicableVapeToggle=false;
    this.electronicToggle=false;
    this.healthAndBeautyToggle=false;
    this.produceToggle=true;
    this.wareHouseToggle=false;
    this.accessoriesToggle=false;
    this.householdToggle=false;
    this.featuredToggle=false;
    this.tobacco=false;
    this.trendingToggle2=false;
    this.trendingToggle3=false;
    this.trendingToggle4=false;
    this.trendingToggle=false;
    this.trendingToggle1=false;
  }
  tobaccoFunction(){
    this.dryGroceryToggle=false;
    this.cigaretToggle=false;
    this.despicableVapeToggle=false;
    this.electronicToggle=false;
    this.healthAndBeautyToggle=false;
    this.produceToggle=false;
    this.wareHouseToggle=false;
    this.accessoriesToggle=false;
    this.householdToggle=false;
    this.featuredToggle=false;
    this.trendingToggle=false;
    this.trendingToggle2=false;
    this.trendingToggle3=false;
    this.trendingToggle4=false;
    this.tobacco=true;
    this.trendingToggle1=false;
  }
  wareHouseFunction(){
    this.dryGroceryToggle=false;
    this.cigaretToggle=false;
    this.despicableVapeToggle=false;
    this.electronicToggle=false;
    this.healthAndBeautyToggle=false;
    this.produceToggle=false;
    this.tobacco=false;
    this.accessoriesToggle=false;
    this.householdToggle=false;
    this.featuredToggle=false;
    this.trendingToggle=false;
    this.trendingToggle2=false;
    this.trendingToggle3=false;
    this.trendingToggle4=false;
    this.wareHouseToggle = true;
    this.trendingToggle1=false;
  }
  accessoriesFunction(){
    this.dryGroceryToggle=false;
    this.cigaretToggle=false;
    this.despicableVapeToggle=false;
    this.electronicToggle=false;
    this.healthAndBeautyToggle=false;
    this.produceToggle=false;
    this.tobacco=false;
    this.wareHouseToggle=false;
    this.householdToggle=false;
    this.featuredToggle=false;
    this.trendingToggle=false;
    this.trendingToggle2=false;
    this.trendingToggle3=false;
    this.trendingToggle4=false;
    this.accessoriesToggle=true;
    this.trendingToggle1=false;
  }
  householdFunction(){
    this.dryGroceryToggle=false;
    this.cigaretToggle=false;
    this.despicableVapeToggle=false;
    this.electronicToggle=false;
    this.healthAndBeautyToggle=false;
    this.produceToggle=false;
    this.tobacco=false;
    this.wareHouseToggle=false;
    this.accessoriesToggle=false;
    this.featuredToggle=false;
    this.trendingToggle=false;
    this.trendingToggle2=false;
    this.trendingToggle3=false;
    this.trendingToggle4=false;
    this.householdToggle=true;
    this.trendingToggle1=false;
  }

  featuredFunction(){
    this.dryGroceryToggle=false;
    this.cigaretToggle=false;
    this.despicableVapeToggle=false;
    this.electronicToggle=false;
    this.healthAndBeautyToggle=false;
    this.produceToggle=false;
    this.tobacco=false;
    this.wareHouseToggle=false;
    this.accessoriesToggle=false;
    this.householdToggle=false;
    this.trendingToggle=false;
    this.trendingToggle2=false;
    this.trendingToggle3=false;
    this.trendingToggle4=false;
    this.featuredToggle=true;
    this.trendingToggle1=false;
  }

  TrendingFunction(){
    this.dryGroceryToggle=false;
    this.cigaretToggle=false;
    this.despicableVapeToggle=false;
    this.electronicToggle=false;
    this.healthAndBeautyToggle=false;
    this.produceToggle=false;
    this.tobacco=false;
    this.wareHouseToggle=false;
    this.accessoriesToggle=false;
    this.householdToggle=false;
    this.featuredToggle=false;
    this.trendingToggle2=false;
    this.trendingToggle3=false;
    this.trendingToggle4=false;
    this.trendingToggle=true;
    this.trendingToggle1=false;
  }
  TrendingFunction1(){
    this.dryGroceryToggle=false;
    this.cigaretToggle=false;
    this.despicableVapeToggle=false;
    this.electronicToggle=false;
    this.healthAndBeautyToggle=false;
    this.produceToggle=false;
    this.tobacco=false;
    this.wareHouseToggle=false;
    this.accessoriesToggle=false;
    this.householdToggle=false;
    this.featuredToggle=false;
    this.trendingToggle=false;
    this.trendingToggle1=true;
    this.trendingToggle2=false;
    this.trendingToggle3=false;
    this.trendingToggle4=false;
  }
  TrendingFunction2(){
    this.dryGroceryToggle=false;
    this.cigaretToggle=false;
    this.despicableVapeToggle=false;
    this.electronicToggle=false;
    this.healthAndBeautyToggle=false;
    this.produceToggle=false;
    this.tobacco=false;
    this.wareHouseToggle=false;
    this.accessoriesToggle=false;
    this.householdToggle=false;
    this.featuredToggle=false;
    this.trendingToggle=false;
    this.trendingToggle1=false;
    this.trendingToggle2=true;
    this.trendingToggle3=false;
    this.trendingToggle4=false;
  }

  TrendingFunction3(){
    this.dryGroceryToggle=false;
    this.cigaretToggle=false;
    this.despicableVapeToggle=false;
    this.electronicToggle=false;
    this.healthAndBeautyToggle=false;
    this.produceToggle=false;
    this.tobacco=false;
    this.wareHouseToggle=false;
    this.accessoriesToggle=false;
    this.householdToggle=false;
    this.featuredToggle=false;
    this.trendingToggle=false;
    this.trendingToggle1=false;
    this.trendingToggle2=false;
    this.trendingToggle3=true;
    this.trendingToggle4=false;
  }

  TrendingFunction4(){
    this.dryGroceryToggle=false;
    this.cigaretToggle=false;
    this.despicableVapeToggle=false;
    this.electronicToggle=false;
    this.healthAndBeautyToggle=false;
    this.produceToggle=false;
    this.tobacco=false;
    this.wareHouseToggle=false;
    this.accessoriesToggle=false;
    this.householdToggle=false;
    this.featuredToggle=false;
    this.trendingToggle=false;
    this.trendingToggle1=false;
    this.trendingToggle2=false;
    this.trendingToggle3=false;
    this.trendingToggle4=true;
  }
}
