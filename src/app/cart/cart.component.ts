import { Component, OnInit } from '@angular/core';
import { ImageService } from '../shared/image.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];

  constructor(private cartService: ImageService, private http:HttpClient) { }

  ngOnInit() {
    this.fetchCartItems();
  }
  fetchCartItems() {
    this.cartService.getCartItems("YOp3F6vVpgOJ3eDvLysPoc7lvuA2").subscribe(items => {
      this.cartItems = items;
      console.log(items)
    });
  }

  removeFromCart(item: any) {
    this.cartService.removeCartItem(item.cartItemId, "YOp3F6vVpgOJ3eDvLysPoc7lvuA2").then(() => {
      // Item removed from cart successfully
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

  sendEmail() {
    const emailEndpoint = 'https://formspree.io/f/xwkjjgdb';
    const emailData = {
      productName: this.cartItems['productName'],
      productDescription: this.cartItems['productDescription'],
      productPrice: this.cartItems['productPrice']
    };

    this.http.post(emailEndpoint, emailData).subscribe(
      () => {
        // Email sent successfully
        // this.contactForm.reset();
      },
      (error) => {
        console.error('Error sending email:', error);
        console.log('Response:', error.error);
      }
    );
  }
}
