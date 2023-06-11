import { Component, ElementRef, ViewChild } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NgForm } from '@angular/forms';
import { Title, Meta } from '@angular/platform-browser'
import { NavigationExtras, Router } from '@angular/router';
import { ImageService } from 'src/app/shared/image.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css', 'home.component.scss'],
})
export class Home {
  raw0cip: string = ' '
  emailService: any;
  imageList: any[];
  imageLists: any[];
  rowIndexArray: any[];

  @ViewChild('f') form!:NgForm;
  @ViewChild('closeButton') closeButton: ElementRef<HTMLButtonElement>;
  dialogOpen = true;

  items = [
    {
      name: "Rice Cooker(1.5Ltrs)",
      value: "25",
      image_src: "assets/img6.jpg",
      rootClassName: "rootClassName4"
    },
    
    // Add more items as needed
  ];

  constructor(private title: Title, private meta: Meta,
    private router: Router,private service: ImageService,
    private afAuth: AngularFireAuth) {
    this.title.setTitle('Mobillio Online Store')
    this.meta.addTags([
      {
        property: 'og:title',
        content: 'Mobillio Online Store',
      },
    ])

  }
  ngOnInit(){
 
    const script1 = document.createElement('script');
 
    script1.src = 'assets/javascript.js';
  
    document.head.appendChild(script1);

    this.service.featuredDetails.snapshotChanges().subscribe(
      list => {
        this.imageList = list.map(item => { return item.payload.val(); });
        // this.rowIndexArray =  Array.from(Array(Math.ceil((this.imageList.length+1) / 3)).keys());
      }
    )

    this.service.trendingProductsDetails.snapshotChanges().subscribe(
      list => {
        this.imageLists = list.map(item => { return item.payload.val(); });
        // this.rowIndexArray =  Array.from(Array(Math.ceil((this.imageList.length+1) / 3)).keys());
      }
    )
    
    console.log(this.imageList)
   }

  //dryGrocery function
  dryGrocery() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        param: "dryGrocery",
        type: "dryGrocery"
      }
    };
    this.router.navigate(['/product'], navigationExtras);
  }

  //Cigarette function
  cigarette(){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        param: "cigarettes",
        type: "cigarettes"
      }
    };
    this.router.navigate(['/product'], navigationExtras);
  }

  //despicableVape function
  despicableVape(){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        param: "despicableVape",
        type: "despicableVape"
      }
    };
    this.router.navigate(['/product'], navigationExtras);
  }

  //electronic function
  electronic(){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        param: "electronic",
        type: "electronic"
      }
    };
    this.router.navigate(['/product'], navigationExtras);
  }

  //health&Beauty function
  healthAndBeauty(){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        param: "healthAndBeauty",
        type: "healthAndBeauty"
      }
    };
    this.router.navigate(['/product'], navigationExtras);
  }

  //produce function
  produce(){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        param: "produce",
        type: "produce"
      }
    };
    this.router.navigate(['/product'], navigationExtras);
  }

  //tobacco function
  tobacco(){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        param: "tobacco",
        type: "tobacco"
      }
    };
    this.router.navigate(['/product'], navigationExtras);
  }

  wareHouse(){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        param: "wareHouse",
        type: "wareHouse"
      }
    };
    this.router.navigate(['/product'], navigationExtras);
  }

  accessories(){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        param: "accessories",
        type: "accessories"
      }
    };
    this.router.navigate(['/product'], navigationExtras);
  }

  household(){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        param: "household",
        type: "household"
      }
    };
    this.router.navigate(['/product'], navigationExtras);
  }





  navagatingID:any;
  email: string;
password: string;
errorMessage: string;
isSignUp: boolean = false;

navigatingParam:any;
navigatingType:any;
featuredProduct(id:any){
  this.navagatingID=id
  const button = document.querySelector('button[onclick="window.dialog.showModal();"]');
    if (button) {
      button.dispatchEvent(new Event('click'));
    }
    this.navigatingParam="featuredProduct"
    this.navigatingType="featuredProduct"
}

trendingProduct(id:any){
  this.navagatingID=id
  const button = document.querySelector('button[onclick="window.dialog.showModal();"]');
    if (button) {
      button.dispatchEvent(new Event('click'));
    }
    this.navigatingParam="trendingProduct"
    this.navigatingType="trendingProduct"
}

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
          param:this.navigatingParam,
          type: this.navigatingType,
          email:user.uid
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
