import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { BehaviorSubject, from } from 'rxjs';
import { map, tap} from 'rxjs/operators';
import { Storage } from '@capacitor/storage'
import { User } from './user.model';
export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  localId: string;
  expiresIn: string;
  registered?:boolean;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // AIzaSyCUpAaqRqnTqt4n5NrfASQYoxUtLzPQka8
  // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=
private _user = new BehaviorSubject<User>(null);

get isUserAuthentication(){
  return this._user.asObservable().pipe(
    map(user =>{
      if (user){
        return !!user.token;
      }else{
        return false;
      }
    })
  );
}
get userId(){
  return this._user.asObservable().pipe(
    map(user =>{
      if (user){
        return user.id;
      }else{
        return null;
      }
    })
  );
}
// private _isUserAuthentication:boolean=true;
// username='a';
// password='sharma';
// isCredentialsTrue:boolean
  constructor(private http: HttpClient) {}
  signup(email:string, password:string){
    return this.http
    .post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCUpAaqRqnTqt4n5NrfASQYoxUtLzPQka8`,
      { email: email, password:password, returnSecureToken: true}
    )
    .pipe(tap(this.setUserData.bind(this)));
  }
  login(email: string, password:string){
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCUpAaqRqnTqt4n5NrfASQYoxUtLzPQka8',
      { email: email, password: password, returnSecureToken: true}
    )
    .pipe(tap(this.setUserData.bind(this)));
  }
  logout(){
    this._user.next(null);
  }
  private setUserData(userData: AuthResponseData){
    const expirationTime = new Date(
      new Date().getTime() + +userData.expiresIn * 1000
    );
    this._user.next(
      new User(
        userData.localId,
        userData.email,
        userData.idToken,
        expirationTime
      )
    );
    this.storeAuthData(
      userData.localId,
      userData.idToken,
      expirationTime.toISOString(),
      userData.email
    )
  }
  //we imported storage from capacitor and did this below function because when page was reloaded then the page was not storing the auth data.

  private storeAuthData(
    userId: string,
    token: string,
    tokenExpirationDate: string,
    email: string
  ){
    const data = JSON.stringify({
      userId: userId,
      token: token,
      tokenExpirationDate: tokenExpirationDate,
      email: email
    });
    //localStorage.setItem('authData)
    //this is for normal angular project without ionic
    Storage.set({ key: 'authData', value: data});
  }
  autoLogin(){
    return from(Storage.get({ key:'authData'})).pipe(
      map(storedData =>{
        if (!storedData || !storedData.value){
          return null;
        }
        const parsedData = JSON.parse(storedData.value) as {
          token: string;
          tokenExpirationDate: string;
          userId: string;
          email: string;
        };
        console.log(parsedData)
        const expirationTime = new Date (parsedData.tokenExpirationDate);
        if(expirationTime <= new Date()){
          return null;
        }
        const user = new User(
          parsedData.userId,
          parsedData.email,
          parsedData.token,
          expirationTime
        );
        return user;
      }),
      tap(user =>{
        if(user){
          this._user.next(user);
        }
      }),
      map(user =>{
        return !!user;
      })
    );
  }

  // 
  // 'get' key word is used to ensure to return value.
  //   get isUserAuthentication(){
  //       return this._isUserAuthentication;
  //   }
  // login(){
  //   this._isUserAuthentication=this.checkCredentials?true:false;
  // }
  // logout(){
  //   this._isUserAuthentication=false;
  //   this.isCredentialsTrue=false;
  // }
  // checkCredentials(username:string,password:string){
  //   this.isCredentialsTrue = (username===this.username && password===this.password);
  //   if(this.isCredentialsTrue){
  //     this.login();
  //   }else{
  //     this.presentAlert();
  //   }
  // }
  // async presentAlert(){
  //   const alert = await this.alertController.create({
  //     header: 'Incorrect Credentials',
  //     message: 'Either  username or password is incorrect.',
  //     buttons: ['ok']
  //   });
  //   await alert.present();
  // }
}
