import { Component, OnInit } from '@angular/core';
import { BookType } from '../shared/component/auth/type/book';
import { CartService } from '../shared/component/auth/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
  cart: BookType[] = [];
  totalPrice: number = 0;
  private cartSubscription!: Subscription;
  constructor(private cartService:CartService){

  }
  ngOnInit() {
    this.cartSubscription = this.cartService.getCart().subscribe((cart: BookType[]) => {
      this.cart = cart;
      this.totalPrice = this.cartService.getTotalPrice(); // Tính lại tổng tiền mỗi khi giỏ hàng thay đổi
    });
  }
}
