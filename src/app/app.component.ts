
import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { NavigationEnd, NavigationExtras, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ImageService } from './shared/image.service';
import { Location } from '@angular/common';
import * as $ from 'jquery';
import { NgForm } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('f') form!:NgForm;


  title = 'teleport-project-template-angular';
  currentRoute: string;
  checkUrl:boolean=true;
  checkAuth:boolean = true;
  receivedData
  constructor(private router: Router, 
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




  @ViewChild('closeButton') closeButton: ElementRef<HTMLButtonElement>;
  dialogOpen = false;
  
  redirect(){
    this.dialogOpen = true;
    const button = document.querySelector('button[onclick="window.dialog.showModal();"]');
    if (button) {
      button.dispatchEvent(new Event('click'));
    }
   
  }
// //submit
// confirm(form: NgForm) {
//   if (form.valid) {
//     // Handle the form submission logic here
//     console.log(this.form.value)
//     // Close the dialog
//     // const dialog = document.getElementById('dialog') as HTMLDialogElement;
//     // setTimeout(() => {
//     //   dialog.close();
//     // }, 2000);
//     let navigationExtras: NavigationExtras = {
//       queryParams: {
//         param: this.param,
//         type: this.param,
//       }
//     };
//     this.router.navigate(['/product', this.navagatingID],navigationExtras);
//   } else {
//     // Show error messages or handle the incomplete form case
//   }
// }


email: string;
password: string;
errorMessage: string;
isSignUp: boolean = false;
login() {
  this.afAuth.signInWithEmailAndPassword(this.email, this.password)
    .then((userCredential) => {
      // Get the current user from the userCredential object
      const user = userCredential.user;
      
      // Access the user properties
      console.log('Current user:', user);
      console.log('User email:', user.email);
      this.dialogOpen=false;
      let navigationExtras: NavigationExtras = {
        queryParams: {
          email:user.uid
        }
      };
      this.router.navigate(['/cart'], navigationExtras);
   
    })
    .catch(error => {
      this.errorMessage = error.message;
    });
}

signup() {
  this.afAuth.createUserWithEmailAndPassword(this.email, this.password)
    .then(() => {
      // Redirect or do something after successful signup
      this.toggleSignup()
    })
    .catch(error => {
      this.errorMessage = error.message;
    });
}

toggleSignup() {
  this.isSignUp = !this.isSignUp;
  this.errorMessage = null;
  this.email = '';
  this.password = '';
}
}