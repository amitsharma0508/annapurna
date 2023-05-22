import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ImageService {
  // imageDetailList: AngularFireList<any>;
  groceryDetails: AngularFireList<any>;
  groceryItem: AngularFireList<any>;
  cigarettesDetails: AngularFireList<any>;
  despicableVapeDetails: AngularFireList<any>;
  electronicDetails: AngularFireList<any>;
  healthAndBeautyDetails: AngularFireList<any>;
  produceDetails: AngularFireList<any>;
  tobaccoDetails: AngularFireList<any>;
  wareHouseDetails:AngularFireList<any>;
  accessoriesDetails:AngularFireList<any>;
  householdDetails:AngularFireList<any>;
  private dataSubject = new Subject<any>();
  private random = new Subject<number>();
  sendData(data: any) {
    this.dataSubject.next(data);
  }
  sendAuth(data: number){
    console.log(data + "service")
    this.random.next(data)
  }
  getDatas(){
    return this.random.asObservable();
  }
  getData() {
    console.log(this.dataSubject.asObservable() + "service2")
    return this.dataSubject.asObservable();
  }

  constructor(private firebase: AngularFireDatabase) { 

  }


  getinsertGroceryDetails() {
    this.groceryDetails = this.firebase.list('groceryList');
  }
  insertGroceryDetails(groceryList) {
    this.groceryDetails.push(groceryList)
  }
  getGroceryByName(id: string): Observable<any> {
    console.log("id" + id)
    const groceryNamesRef = this.firebase.list('groceryList');
    return groceryNamesRef.valueChanges().pipe(
      map((groceryNames: any) => {
        const ids = groceryNames[id];
        if (groceryNames.hasOwnProperty(ids)) {
          console.log("fetchee")
          const groceryItemRef = this.firebase.list(`groceryList/${id}`);
          return groceryItemRef.valueChanges();

        } else {
          console.log("fetchee wrong")
          throw new Error(`Grocery item with name "${id}" not found.`);
        }
      })
    );
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

  getWareHouseDetails(){
    this.wareHouseDetails= this.firebase.list('wareHouseList')
  }
  insertWareHouseDetails(wareHouseList){
    console.log("trigreed")
    this.wareHouseDetails.push(wareHouseList)
  }
  getAccessoriesDetails(){
    this.accessoriesDetails= this.firebase.list('accessoriesList')
  }
  insertAccessoriesDetails(accessoriesList){
    console.log("trigreed")
    this.accessoriesDetails.push(accessoriesList)
  }
  getHouseholdDetails(){
    this.householdDetails= this.firebase.list('HouseholdList')
  }
  insertHouseholdDetails(HouseholdList){
    console.log("trigreed")
    this.householdDetails.push(HouseholdList)
  }
  
}
