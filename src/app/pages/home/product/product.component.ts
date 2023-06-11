import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ImageService } from 'src/app/shared/image.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  param!: string;
  testToggle:boolean=false;
  imageList: any[];
  rowIndexArray: any[];
  searchTerm: string; // New property for the search term
  filterProducts(): any[] {
    if (!this.searchTerm) {
      return this.imageList;
    }
    const searchTerm = this.searchTerm.toLowerCase();
    return this.imageList.filter(item => item.productName.toLowerCase().includes(searchTerm));
  }


  @ViewChild('f') form!:NgForm;
  @ViewChild('closeButton') closeButton: ElementRef<HTMLButtonElement>;
  dialogOpen = true;


navagatingID:any;


  constructor(private route: ActivatedRoute,private service: ImageService, private router: Router,private afAuth: AngularFireAuth) { }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.param = params['param'];
      this.fetchDataBasedOnParam();
    });
    const script1 = document.createElement('script');
  
    script1.src = 'assets/img/side-nav-toggle.js';

    document.head.appendChild(script1);

  }
  fetchDataBasedOnParam() {
    if(this.param == 'dryGrocery'){
      this.service.groceryDetails.snapshotChanges().subscribe(
       list => {
         this.imageList = list.map(item => { return item.payload.val(); });
         this.rowIndexArray =  Array.from(Array(Math.ceil((this.imageList.length+1) / 3)).keys());
       }
     );
     }
     if(this.param == 'cigarettes'){
       this.service.cigarettesDetails.snapshotChanges().subscribe(
        list => {
          this.imageList = list.map(item => { return item.payload.val(); });
          this.rowIndexArray =  Array.from(Array(Math.ceil((this.imageList.length+1) / 3)).keys());
        }
      );
     }
     if(this.param == 'despicableVape'){
       this.service.despicableVapeDetails.snapshotChanges().subscribe(
        list => {
          this.imageList = list.map(item => { return item.payload.val(); });
          this.rowIndexArray =  Array.from(Array(Math.ceil((this.imageList.length+1) / 3)).keys());
        }
      );
     }
     if(this.param == 'electronic'){
       this.service.electronicDetails.snapshotChanges().subscribe(
        list => {
          this.imageList = list.map(item => { return item.payload.val(); });
          this.rowIndexArray =  Array.from(Array(Math.ceil((this.imageList.length+1) / 3)).keys());
        }
      );
     }
     if(this.param == 'healthAndBeauty'){
       this.service.healthAndBeautyDetails.snapshotChanges().subscribe(
        list => {
          this.imageList = list.map(item => { return item.payload.val(); });
          this.rowIndexArray =  Array.from(Array(Math.ceil((this.imageList.length+1) / 3)).keys());
        }
      );
     }
     if(this.param == 'produce'){
       this.service.produceDetails.snapshotChanges().subscribe(
        list => {
          this.imageList = list.map(item => { return item.payload.val(); });
          this.rowIndexArray =  Array.from(Array(Math.ceil((this.imageList.length+1) / 3)).keys());
        }
      );
     }
     if(this.param == 'tobacco'){
       this.service.tobaccoDetails.snapshotChanges().subscribe(
        list => {
          this.imageList = list.map(item => { return item.payload.val(); });
          this.rowIndexArray =  Array.from(Array(Math.ceil((this.imageList.length+1) / 3)).keys());
        }
      );
     }
     if(this.param == 'wareHouse'){
       this.service.wareHouseDetails.snapshotChanges().subscribe(
        list => {
          this.imageList = list.map(item => { return item.payload.val(); });
          this.rowIndexArray =  Array.from(Array(Math.ceil((this.imageList.length+1) / 3)).keys());
        }
      );
     }
     if(this.param == 'accessories'){
       this.service.accessoriesDetails.snapshotChanges().subscribe(
        list => {
          this.imageList = list.map(item => { return item.payload.val(); });
          this.rowIndexArray =  Array.from(Array(Math.ceil((this.imageList.length+1) / 3)).keys());
        }
      );
     }
     if(this.param == 'household'){
       this.service.householdDetails.snapshotChanges().subscribe(
        list => {
          this.imageList = list.map(item => { return item.payload.val(); });
          this.rowIndexArray =  Array.from(Array(Math.ceil((this.imageList.length+1) / 3)).keys());
        }
      );
     }
  }

  redirect(id:any){
    this.navagatingID=id
    // const button = document.querySelector('button[onclick="window.dialog.showModal();"]');
    // if (button) {
    //   button.dispatchEvent(new Event('click'));
    // }
    let navigationExtras: NavigationExtras = {
      queryParams: {
        param: this.param,
        type: this.param,
        // email:user.uid,
        // actualEmail:user.email
      }
    };
    this.router.navigate(['/product', this.navagatingID], navigationExtras);
   
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

      let navigationExtras: NavigationExtras = {
        queryParams: {
          param: this.param,
          type: this.param,
          email:user.uid,
          actualEmail:user.email
        }
      };
      this.router.navigate(['/product', this.navagatingID], navigationExtras);
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
