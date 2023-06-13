import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { observable } from 'rxjs';
import { ImageService } from 'src/app/shared/image.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  id
  product:any
  imageList:any
  param:any;
  constructor(private route:ActivatedRoute,private afAuth: AngularFireAuth,private service: ImageService, private router:Router) {
    this.currentUserEmail = localStorage.getItem('currentUserEmail');
    this.actualEmail = localStorage.getItem('actualEmail');
   }
   
   currentUserEmail:any;
   actualEmail:any

  ngOnInit(): void {
    this.service.getUserDetails();
    const script1 = document.createElement('script');
  
    script1.src = 'assets/img/side-nav-toggle.js';

    document.head.appendChild(script1);
    this.route.queryParams.subscribe(params => {
      this.param = params['param'];
      this.currentUserEmail = params['email']
      this.actualEmail = params['actualEmail']
      console.log(this.currentUserEmail + "currentuseremail")
    });
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if(this.param == "dryGrocery"){
        this.service.groceryDetails.snapshotChanges().subscribe(
          list => {
            this.imageList = list.map(item => item.payload.val());
            this.product = this.imageList.filter(item => item.id === id);
            console.log(this.product, "product");
            // Rest of your code that relies on the filtered product details
          }
        );
      }

      if(this.param == "accessories"){
        console.log(this.currentUserEmail + "currentuseremail")
        this.service.accessoriesDetails.snapshotChanges().subscribe(
          list => {
            this.imageList = list.map(item => item.payload.val());
            this.product = this.imageList.filter(item => item.id === id);
            console.log(this.product, "product");
            // Rest of your code that relies on the filtered product details
          }
        );
      }
      if(this.param == "cigarettes"){
        this.service.cigarettesDetails.snapshotChanges().subscribe(
          list => {
            this.imageList = list.map(item => item.payload.val());
            this.product = this.imageList.filter(item => item.id === id);
            console.log(this.product, "product");
            // Rest of your code that relies on the filtered product details
          }
        );
      }
      if(this.param == "despicableVape"){
    
        this.service.despicableVapeDetails.snapshotChanges().subscribe(
          list => {
            this.imageList = list.map(item => item.payload.val());
            this.product = this.imageList.filter(item => item.id === id);
            console.log(this.product, "product");
            // Rest of your code that relies on the filtered product details
          }
        );
      }
      if(this.param == "electronic"){
        this.service.electronicDetails.snapshotChanges().subscribe(
          list => {
            this.imageList = list.map(item => item.payload.val());
            this.product = this.imageList.filter(item => item.id === id);
            console.log(this.product, "product");
            // Rest of your code that relies on the filtered product details
          }
        );
      }
      if(this.param == "healthAndBeauty"){
        this.service.healthAndBeautyDetails.snapshotChanges().subscribe(
          list => {
            this.imageList = list.map(item => item.payload.val());
            this.product = this.imageList.filter(item => item.id === id);
            console.log(this.product, "product");
            // Rest of your code that relies on the filtered product details
          }
        );
      }
      if(this.param == "produce"){
        this.service.produceDetails.snapshotChanges().subscribe(
          list => {
            this.imageList = list.map(item => item.payload.val());
            this.product = this.imageList.filter(item => item.id === id);
            console.log(this.product, "product");
            // Rest of your code that relies on the filtered product details
          }
        );
      }
      if(this.param == "tobacco"){
        this.service.tobaccoDetails.snapshotChanges().subscribe(
          list => {
            this.imageList = list.map(item => item.payload.val());
            this.product = this.imageList.filter(item => item.id === id);
            console.log(this.product, "product");
            // Rest of your code that relies on the filtered product details
          }
        );
      }
      if(this.param == "wareHouse"){
        this.service.wareHouseDetails.snapshotChanges().subscribe(
          list => {
            this.imageList = list.map(item => item.payload.val());
            this.product = this.imageList.filter(item => item.id === id);
            console.log(this.product, "product");
            // Rest of your code that relies on the filtered product details
          }
        );
      }
      if(this.param == "household"){
        this.service.householdDetails.snapshotChanges().subscribe(
          list => {
            this.imageList = list.map(item => item.payload.val());
            this.product = this.imageList.filter(item => item.id === id);
            console.log(this.product, "product");
            // Rest of your code that relies on the filtered product details
          }
        );
      }
      if(this.param == "featuredProduct"){
        this.service.featuredDetails.snapshotChanges().subscribe(
          list => {
            this.imageList = list.map(item => item.payload.val());
            this.product = this.imageList.filter(item => item.id === id);
            console.log(this.product, "product");
            // Rest of your code that relies on the filtered product details
          }
        );
      }
      if(this.param == "trendingProduct"){
        this.service.trendingProductsDetails.snapshotChanges().subscribe(
          list => {
            this.imageList = list.map(item => item.payload.val());
            this.product = this.imageList.filter(item => item.id === id);
            console.log(this.product, "product");
            // Rest of your code that relies on the filtered product details
          }
        );
      }
    });
  }


  loading:boolean;
  quantity:any;
  @ViewChild('f') form!:NgForm;
  @ViewChild('closeButton') closeButton: ElementRef<HTMLButtonElement>;
  dialogOpen = true;
  addToCart(product: any): void {
    this.productDetails = product;
    console.log(product + "product");
  
    const currentUserEmail = localStorage.getItem('currentUserEmail');
    const actualEmail = localStorage.getItem('actualEmail');
  
    if (!currentUserEmail || !actualEmail) {
      const button = document.querySelector('button[onclick="window.dialog.showModal();"]');
      if (button) {
        button.dispatchEvent(new Event('click'));
      }
      this.login();
    } else {
      this.service.addToCart(product, currentUserEmail)
        .then(() => {
          // Item added to cart successfully
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
          }, 2000);
          setTimeout(() => {
            let navigationExtras: NavigationExtras = {
              queryParams: {
                quantity: this.quantity,
                email: currentUserEmail,
                actualEmail: actualEmail
              }
            };
            console.log(JSON.stringify(this.quantity) + "dsfasf")
            this.router.navigate(['/cart'], navigationExtras);
          }, 2001);
  
          console.log("Item added to cart successfully");
        })
        .catch(error => {
          console.log('Error adding item to cart:', error);
        });
    }
  }

  email
  password
  errorMessage
  errorMessageAlert:boolean=false;
  login() {
    this.afAuth.signInWithEmailAndPassword(this.email, this.password)
      .then((userCredential) => {
        // Get the current user from the userCredential object
        const user = userCredential.user;
        
        // Access the user properties
        console.log('Current user:', user);
        console.log('User email:', user.email);
        this.currentUserEmail=user.uid,
        this.actualEmail=user.email,

        localStorage.setItem('currentUserEmail', user.uid);
        localStorage.setItem('actualEmail', user.email);

        this.navigate();
      }).catch(error => {
        this.errorMessage = error.message;
        this.errorMessageAlert=true
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
        console.log(userData + "userDAta")
        console.log(this.email + "email")
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
  isSignUp
  toggleSignup() {
    this.isSignUp = !this.isSignUp;
    this.errorMessage = null;
    this.email = '';
    this.password = '';
  }
productDetails:any
  navigate(){
      this.service.addToCart(this.productDetails, this.currentUserEmail)
    .then(() => {
      // Item added to cart successfully
      this.loading=true;
      setTimeout(() => {
        this.loading=false;
      }, 2000);
      setTimeout(() => {
        let navigationExtras: NavigationExtras = {
          queryParams: {
            quantity:this.quantity,
            email: this.currentUserEmail,
            actualEmail:this.actualEmail
          }
        };
        console.log(JSON.stringify(this.quantity) + "dsfasf")
        this.router.navigate(['/cart'], navigationExtras);
      }, 2001);
    
      console.log("Item added to cart successfully")
    })
    .catch(error => {
      console.log('Error adding item to cart:', error);
    });
  }
}
