import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';


@Injectable({
  providedIn: 'root'
})
export class ImageService {
  // imageDetailList: AngularFireList<any>;
  groceryDetails: AngularFireList<any>;
  cigarettesDetails: AngularFireList<any>;
  despicableVapeDetails: AngularFireList<any>;
  electronicDetails: AngularFireList<any>;
  healthAndBeautyDetails: AngularFireList<any>;
  produceDetails: AngularFireList<any>;
  tobaccoDetails: AngularFireList<any>;

  constructor(private firebase: AngularFireDatabase) { 

  }


  getinsertGroceryDetails() {
    this.groceryDetails = this.firebase.list('groceryList');
  }
  insertGroceryDetails(groceryList) {
    this.groceryDetails.push(groceryList)
  }

  getInsertCigarettesDetails(){
    this.cigarettesDetails= this.firebase.list('cigarettesList')
  }
  insertCigarettesDetails(cigarettesList){
    this.cigarettesDetails.push(cigarettesList)
  }

  getDespicableVapeDetails(){
    this.despicableVapeDetails= this.firebase.list('despicableVapeList')
  }
  insertDespicableVapeDetails(despicableVapeList){
    this.despicableVapeDetails.push(despicableVapeList)
  }

  getElectronicDetails(){
    this.electronicDetails= this.firebase.list('electronicList')
  }
  insertElectronicDetails(electronicList){
    this.electronicDetails.push(electronicList)
  }

  getHealthAndBeautyDetails(){
    this.healthAndBeautyDetails= this.firebase.list('healthAndBeautyList')
  }
  insertHealthAndBeautyDetails(healthAndBeautyList){
    this.healthAndBeautyDetails.push(healthAndBeautyList)
  }

  getProduceDetails(){
    this.produceDetails= this.firebase.list('produceList')
  }
  insertProduceDetails(produceList){
    this.produceDetails.push(produceList)
  }

  getTobaccoDetails(){
    this.tobaccoDetails= this.firebase.list('tobaccoList')
  }
  insertTobaccoDetails(tobaccoList){
    this.tobaccoDetails.push(tobaccoList)
  }


  
}
