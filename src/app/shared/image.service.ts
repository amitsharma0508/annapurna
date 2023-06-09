import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { AngularFirestore, DocumentReference } from '@angular/fire/compat/firestore';
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
  featuredDetails:AngularFireList<any>;
  trendingProductsDetails:AngularFireList<any>;
  trendingProducts1Details:AngularFireList<any>;
  trendingProducts2Details:AngularFireList<any>;
  trendingProducts3Details:AngularFireList<any>;
  trendingProducts4Details:AngularFireList<any>;

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

  constructor(private firebase: AngularFireDatabase, private afAuth: AngularFireAuth) { 

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

  getfeaturedDetails(){
    this.featuredDetails= this.firebase.list('featuredList')
  }
  insertfeaturedDetails(featuredList){
    console.log("trigreed")
    this.featuredDetails.push(featuredList)
  }
  
  gettrendingProductsDetails(){
    this.trendingProductsDetails= this.firebase.list('trendingList')
  }
  inserttrendingProductsDetails(trendingList){
    console.log("trigreed")
    this.trendingProductsDetails.push(trendingList)
  }

  gettrendingProducts1Details(){
    this.trendingProducts1Details= this.firebase.list('trendingList1')
  }
  inserttrendingProducts1Details(trendingList1){
    console.log("trigreed")
    this.trendingProducts1Details.push(trendingList1)
  }

  gettrendingProducts2Details(){
    this.trendingProducts2Details= this.firebase.list('trendingList2')
  }
  inserttrendingProducts2Details(trendingList2){
    console.log("trigreed")
    this.trendingProducts2Details.push(trendingList2)
  }

  gettrendingProducts3Details(){
    this.trendingProducts3Details= this.firebase.list('trendingList3')
  }
  inserttrendingProducts3Details(trendingList3){
    console.log("trigreed")
    this.trendingProducts3Details.push(trendingList3)
  }

  gettrendingProducts4Details(){
    this.trendingProducts4Details= this.firebase.list('trendingList4')
  }
  inserttrendingProducts4Details(trendingList4){
    console.log("trigreed")
    this.trendingProducts4Details.push(trendingList4)
  }




  userDetails:AngularFireList<any>;
getUserDetails(){
  this.userDetails= this.firebase.list('userDetails')
}
insertUserDetails(userList){
  if (this.userDetails) {
    this.userDetails.push(userList);
  } else {
    console.error("userDetails is not initialized.");
  }
}
  


  addToCart(product: any, userEmail: string): Promise<void> {
    const [username, domain] = userEmail.split('@');
    const encodedDomain = encodeURIComponent(domain);
    const cartItemId = this.sanitizeCartItemId(product.id);
    return this.firebase.object(`/Cart/${username}@${encodedDomain}/${cartItemId}`).set(product);
  }

  getCartItems(userEmail: string): Observable<any[]> {
    const [username, domain] = userEmail.split('@');
    const encodedDomain = encodeURIComponent(domain);
    return this.firebase.list<any>(`/Cart/${username}@${encodedDomain}`).valueChanges();
  }

  deleteFromCart(productId: string, userEmail: string): Promise<void> {
    const [username, domain] = userEmail.split('@');
    const cartItemId = productId;
    return this.firebase.object(`/Cart/${username}@${domain}/${cartItemId}`).remove();
  }

  private sanitizeCartItemId(cartItemId: string): string {
    return cartItemId.replace(/[.#$[\]/]/g, '');
  }
}
