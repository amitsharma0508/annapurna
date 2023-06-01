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
   }
   currentUserEmail:any;
   actualEmail:any
   totalPrice:number=0;
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.currentUserEmail = params['email']
      this.actualEmail = params['actualEmail']
      console.log(this.currentUserEmail + "currentuseremail")
    });
    this.fetchCartItems(this.currentUserEmail);
  }
  fetchCartItems(currentUserEmail:any) {
    this.cartService.getCartItems(currentUserEmail).subscribe(items => {
      this.cartItems = items;
      for (let i = 0; i < this.cartItems.length; i++) {
        const priceWithoutSymbol = this.cartItems[i].productPrice.replace('$', '');
        const priceAsNumber = parseFloat(priceWithoutSymbol);
        
        this.totalPrice += priceAsNumber;
      }
      console.log(items)
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
  sendEmails() {
    this.btnValue = 'Sending...';

    const serviceID = 'default_service';
    const templateID = 'template_by7nelr';
    const userID = '02q_sPSjlR7D5mYBQ'; // Replace with your actual User ID

    emailjs.send(serviceID, templateID, {
      from_name: 'your valuable customer',
      to_name: 'Annapurna Wholesale',
      email_id: this.actualEmail,
      phone_number: this.phoneNumber,
      address: this.address,
      message: this.generateEmailMessage(),
      reply_to: this.actualEmail
    }, userID)
      .then(() => {
        this.btnValue = 'Send Email';
        alert('Sent!');
      }, (err) => {
        this.btnValue = 'Send Email';
        alert(JSON.stringify(err));
      });
  }
  quantity
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


  
}
