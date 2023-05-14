import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
username:string=''
password:string=''
isLogin: boolean=true;
isLoading:boolean;

  constructor(private navController:NavController,
    private authService:AuthService,
    private router:Router,
    private loadingCtrl:LoadingController,
    private alertCtrl:AlertController) { }

  ngOnInit() {
    // this.authService.checkCredentials;
    
  }
  authenticate(email: string, password: string){
    this.isLoading = true;
    this.loadingCtrl
    .create({ keyboardClose: true, message:'logging in...'})
    .then(loadingE1 => {
      loadingE1.present();
      let authObs: Observable<AuthResponseData>;
      if (this.isLogin){
        authObs = this.authService.login(email, password);
      } else {
        authObs = this.authService.signup(email, password);
      }
      authObs.subscribe(
        resData => {
          console.log(resData);
          this.isLoading = false;
          loadingE1.dismiss();
          this.router.navigateByUrl('/places/tabs/discover');
        },
        errRes =>{
          loadingE1.dismiss();
          const code = errRes.error.error.message;
          let message = 'could not sign you up, please try again';
          if(code === 'EMAIL EXISTS'){
            message = 'This email address exists already!';
          }else if (code === 'EMAIL_NOT_FOUND'){
            message = 'E-Mail address could not be found.';
          }else if(code === 'INVALID_PASSWORD'){
            message = 'This password is not correct';
          }
          this.showAlert(message);
        }
      );
    });
  }
  onSwitchAuthMode(){
    this.isLogin = !this.isLogin;
  }
  onSubmit(){
    const email = this.username;
    const password = this.password;

    this.authenticate(email, password);
    this.username=''
    this.password=''
  }
  private showAlert(message: string){
    this.alertCtrl
    .create({
      header: 'Authentication failed',
      message: message,
      buttons: ['Okay']
    })
    .then(alertE1 => alertE1.present());
  }
  //this is one way of doing directly without authService
  // login(){
  //   this.details=this.username + this.password
  //   if(this.details==''){
  //     return
  //   }
  //   else{
  //     this.navController.navigateForward('/places/tabs/discover')
  //   }
  // }
  
  //this is another way of doing. but to work with this way you need to remove
  //this from checkCredentials function in service if(this.isCredentialsTrue){this.login();
  // login(){
  //   let details=this.username + this.password;
  //   if( details == this.authService.username + this.authService.password){
  //     this.authService.login();
  //     this.navController.navigateForward('/places/tabs/discover')
  //   }
  //   else{
  //     this.authService.logout();
  //     this.navController.navigateBack('/auth');
  //     alert('your username or password is wrong')
  //   }  
  //   console.log(this.authService.isCredentialsTrue);
  // }
  // login(){
  //   this.authService.checkCredentials(this.username, this.password);
  //   this.navController.navigateForward('/places/tabs/discover')
  //   this.username=''
  //   this.password=''
  // }
  
}


