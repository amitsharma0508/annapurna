import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ImageService } from '../shared/image.service';
import { HttpClient } from '@angular/common/http';
import emailjs from 'emailjs-com';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];

  constructor(private cartService: ImageService, private http:HttpClient, private route:ActivatedRoute) {
    this.cartItems.forEach(item => {
      item.quantity = 1;
    });
    this.cartItems.forEach(item => item.previousQuantity = item.quantity);
   }
   currentUserEmail:any;
   actualEmail:any
   totalPrice:number=0;
   quantity:any;
   userDetail:any;
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.currentUserEmail = params['email']
      this.actualEmail = params['actualEmail']
      this.quantity = params['quantity']
      console.log(this.currentUserEmail + "currentuseremail", this.quantity + ("Quantity"))
    });
    this.fetchCartItems(this.currentUserEmail);
    console.log(this.actualEmail + "Actual Email")
    this.cartService.userDetails.snapshotChanges().subscribe(data => {
      const userDetails = data.find(item => item.payload.val().email === this.actualEmail);
      if (userDetails) {
        this.userDetail = userDetails.payload.val();
        console.log(this.userDetail);
      } else {
        console.log('User details not found!');
        console.log(this.actualEmail)
      }
    });
    this.openModal();

  }
  fetchCartItems(currentUserEmail:any) {
    this.cartService.getCartItems(currentUserEmail).subscribe(items => {
      this.cartItems = items;
      // for (let i = 0; i < this.cartItems.length; i++) {
      //   const priceWithoutSymbol = this.cartItems[i].productPrice.replace('$', '');
      //   const priceAsNumber = parseFloat(priceWithoutSymbol);
        
      //   this.totalPrice += priceAsNumber;
      // }
      // console.log(items)
    });
  }

  removeFromCart(item: any) {
    this.cartService.deleteFromCart(item, this.currentUserEmail).then(() => {
      // Item removed from cart successfully
      console.log("working")
    }).catch(error => {
      console.log('Error removing item from cart:', error);
    });
  }

  calculateLineTotal(item: any): number {
    return item.price * item.quantity;
  }

  calculateSubtotal(): number {
    let subtotal = 0;
    for (const item of this.cartItems) {
      subtotal += this.calculateLineTotal(item);
    }
    return subtotal;
  }

  calculateTax(): number {
    return this.calculateSubtotal() * 0.05; // Assuming 5% tax rate
  }

  calculateShipping(): number {
    return 15.00; // Replace with your actual shipping cost calculation
  }

  calculateGrandTotal(): number {
    return this.calculateSubtotal() + this.calculateTax() + this.calculateShipping();
  }




  btnValue = 'Send Email';
  phoneNumber:any;
  address:any
  ein:any
  loading:boolean;
  sendEmails() {
    console.log(this.userDetail['phoneNumber'],)
    this.btnValue = 'Sending...';

    const serviceID = 'default_service';
    const templateID = 'template_ymlrotd';
    const userID = 'LbNjrA62NgKQo88NX'; // Replace with your actual User ID

    emailjs.send(serviceID, templateID, {
      from_name: 'your valuable customer',
      to_name: 'Annapurna Wholesale',
      email_id: this.actualEmail,
      customerName: this.userDetail['name'],
      phone_number: this.userDetail['phoneNumber'],
      address: this.userDetail['address'],
      state:this.userDetail['state'],
      city:this.userDetail['city'],
      einNumber:this.userDetail['einNumber'],
      company:this.userDetail['companyName'],
      message: this.generateEmailMessage(),
      reply_to: this.actualEmail
    }, userID)
      .then(() => {
        this.btnValue = 'Send Email';
        this.loading=true;
        setTimeout(() => {
          this.loading=false;
        }, 2000);
        alert('Sent!');
      }, (err) => {
        this.btnValue = 'Send Email';
        alert(JSON.stringify(err));
      });
  }
  
  generateEmailMessage(): string {
    let message = '';

    this.cartItems.forEach(item => {
      message += `Product Name: ${item.productName}\n`;
      message += `Product Description: ${item.productDescription}\n`;
      message += `Product Price: ${item.productPrice}\n`;
      message += `Product Quantity: ${item.quantity}\n\n`;
    });
    console.log(message)
    return message;
  }


  showModal:boolean;

openModal() {
  this.showModal = true;
}

closeModal() {
  this.showModal = false;
}
itemTotal:any
updateTotal(item: any): void {
  const previousTotal = item.total;
  item.total = this.calculateItemTotal(item);
  item.overallTotal += parseInt(item.total);
  console.log(item.total + 'all');
  console.log(JSON.stringify(item) + "sdf");
  
  
  if (item.quantity > item.previousQuantity) {
    this.totalPrice += item.total - previousTotal;
  } else{
    this.totalPrice -= previousTotal - item.total;
  }
  
  item.previousQuantity = item.quantity;
}

calculateItemTotal(item: any): number {
  const quantity = +item.quantity; // Convert the quantity to a number

  if (isNaN(quantity)) {
    return 0;
  }

  const price = +item.productPrice.replace("$", ""); // Remove the "$" sign from product price and convert it to a number

  if (isNaN(price)) {
    return 0;
  }
  console.log(price * quantity)
  console.log(JSON.stringify(item) + 'all')
  

  return price * quantity;
}

}
