
import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { NavigationEnd, NavigationExtras, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ImageService } from './shared/image.service';
import { Location } from '@angular/common';
import * as $ from 'jquery';
import { NgForm } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import 'firebase/database';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // @ViewChild('f') form!:NgForm;


  title = 'teleport-project-template-angular';
  currentRoute: string;
  checkUrl:boolean=true;
  checkAuth:boolean = true;
  receivedData
  constructor(private router: Router, private firebase: AngularFireDatabase,
    private service:ImageService,private afAuth: AngularFireAuth){
  
  }
  @ViewChild('susbcFormModal') susbcFormModal!: ElementRef;

  ngAfterViewInit() {
    const button = document.querySelector('button[onclick="window.dialog.showModal();"]');
    if (button) {
      button.dispatchEvent(new Event('click'));
    }
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
    this.service.getfeaturedDetails();
    this.service.gettrendingProductsDetails();
    this.service.gettrendingProducts1Details();
    this.service.gettrendingProducts2Details();
    this.service.gettrendingProducts3Details();
    this.service.gettrendingProducts4Details();

    this.service.getUserDetails();
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
  //cart
  cart(){
   this.router.navigate(['/cart'])
  }
  //submit
  confirm(form: NgForm) {
    if (form.valid) {
      // Handle the form submission logic here
      console.log(this.form.value)
      // Close the dialog
      // const dialog = document.getElementById('dialog') as HTMLDialogElement;
      // setTimeout(() => {
      //   dialog.close();
      // }, 2000);

    } else {
      // Show error messages or handle the incomplete form case
    }
  }
  
  //dryGrocery function
  dryGrocery() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        param: "dryGrocery",
        type: "dryGrocery"
      },
      replaceUrl: true
    };
    this.router.navigate(['/product'], navigationExtras).then(() => {
      // window.location.reload();
    });
  }

  //Cigarette function
  cigarette(){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        param: "cigarettes",
        type: "cigarettes"
      },
      replaceUrl: true
    };
    this.router.navigate(['/product'], navigationExtras).then(() => {
      // window.location.reload();
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
      // window.location.reload();
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
      // window.location.reload();
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
      // window.location.reload();
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
      // window.location.reload();
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
      // window.location.reload();
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
      // window.location.reload();
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
      // window.location.reload();
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
      // window.location.reload();
    });
  }




  @ViewChild('f') form!:NgForm;
  @ViewChild('closeButton') closeButton: ElementRef<HTMLButtonElement>;
  dialogOpen:boolean=false;
  
  redirect() {
    // const button = document.querySelector('button[onclick="window.dialog.showModal();"]');
    // if (button) {
    //   button.dispatchEvent(new Event('click'));
    // }
    this.isLoggedIn = true; // Set dialogOpen to true only when triggered
  }
email: string;
password: string;
errorMessage: string;
isSignUp: boolean = false;
isLoggedIn:boolean=false;
login() {
  this.checkUrl = false;
  this.afAuth.signInWithEmailAndPassword(this.email, this.password)
    .then((userCredential) => {
      // Get the current user from the userCredential object
      const user = userCredential.user;
      
      // Access the user properties
      console.log('Current user:', user);
      console.log('User email:', user.email);
      this.isLoggedIn=false;
      

      setTimeout(() => {
        let navigationExtras: NavigationExtras = {
          queryParams: {
            actualEmail: user.email,
            email: user.uid
          }
        }
          this.router.navigate(['/cart'], navigationExtras); // Navigate to cart page only when dialogOpen is true
        // this.dialogOpen=false;
      }, 2000);
     
    })
    .catch(error => {
      this.errorMessage = error.message;
      this.errorMessageAlert=true
      console.log(this.errorMessage)
    });
}
name
companyName
address
state
city
einNumber
phoneNumber
signUpEmail
// userDetails:AngularFireList<any>;
// getUserDetails(){
//   this.userDetails= this.firebase.list('userDetails')
// }
// insertUserDetails(userList){
//   console.log("trigreed")
//   this.userDetails.push(userList)
// }
errorMessageAlert:boolean=false;
signup() {
  this.afAuth.createUserWithEmailAndPassword(this.email, this.password)
    .then(() => {
      // Push data to Firebase Realtime Database
      const userData = {
        name: this.name,
        companyName: this.companyName,
        address: this.address,
        state: this.state,
        city: this.city,
        einNumber: this.einNumber,
        phoneNumber: this.phoneNumber,
        email: this.email
      };
      console.log(userData)
      this.service.insertUserDetails(userData);
      console.log(userData)
      // Redirect or do something after successful signup
      this.toggleSignup();
    })
    .catch(error => {
      this.errorMessage = error.message;
      this.errorMessageAlert=true
      console.log("trigerred" + this.errorMessage)
    });
}

toggleSignup() {
  this.isSignUp = !this.isSignUp;
  this.errorMessage = null;
  this.email = '';
  this.password = '';
}



}