import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  dryGroceryToggle:boolean=true;
  cigaretToggle:boolean=false;
  despicableVapeToggle:boolean=false;
  electronicToggle:boolean=false;
  healthAndBeautyToggle:boolean=false;
  produceToggle:boolean=false;
  tobacco:boolean=false;

  constructor() { }

  ngOnInit(): void {
      const script1 = document.createElement('script');
  
      script1.src = 'assets/img/side-nav-toggle.js';
  
      document.head.appendChild(script1);
  }

  dryGroceryToggleFunction(){
    this.dryGroceryToggle=true;
    this.cigaretToggle=false;
    this.despicableVapeToggle=false;
    this.electronicToggle=false;
    this.healthAndBeautyToggle=false;
    this.produceToggle=false;
    this.tobacco=false;
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
    console.log("trigerred oooooooo")
  }
  despicableVapeToggleFunction(){
    this.dryGroceryToggle=false;
    this.cigaretToggle=false;
    this.despicableVapeToggle=true;
    this.electronicToggle=false;
    this.healthAndBeautyToggle=false;
    this.produceToggle=false;
    this.tobacco=false;
  }
  electronicToggleFunction(){
    this.dryGroceryToggle=false;
    this.cigaretToggle=false;
    this.despicableVapeToggle=false;
    this.electronicToggle=true;
    this.healthAndBeautyToggle=false;
    this.produceToggle=false;
    this.tobacco=false;
  }
  healthAndBeautyToggleFunction(){
    this.dryGroceryToggle=false;
    this.cigaretToggle=false;
    this.despicableVapeToggle=false;
    this.electronicToggle=false;
    this.healthAndBeautyToggle=true;
    this.produceToggle=false;
    this.tobacco=false;
  }
  produceToggleFunction(){
    this.dryGroceryToggle=false;
    this.cigaretToggle=false;
    this.despicableVapeToggle=false;
    this.electronicToggle=false;
    this.healthAndBeautyToggle=false;
    this.produceToggle=true;
    this.tobacco=false;
  }
  tobaccoFunction(){
    this.dryGroceryToggle=false;
    this.cigaretToggle=false;
    this.despicableVapeToggle=false;
    this.electronicToggle=false;
    this.healthAndBeautyToggle=false;
    this.produceToggle=false;
    this.tobacco=true;
  }

}
