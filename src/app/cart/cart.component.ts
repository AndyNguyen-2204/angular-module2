import { Component, OnInit } from '@angular/core';
import { CartService } from '../shared/component/auth/cart.service';
import { BookType } from '../shared/component/auth/type/book';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  cart: BookType[] = [];
  constructor(private cartService: CartService) {}
  ngOnInit() {
    this.getCart();
  }
  getCart() {
    this.cart = this.cartService.getCart();
    console.log(this.cartService.getCart())
  }
  handleMinus(){

  }
  handlePlus(){
    
  }
}
