import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from '../shared/component/auth/cart.service';
import { BookType } from '../shared/component/auth/type/book';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  cart: BookType[] = [];
  totalPrice: number = 0;
  private cartSubscription!: Subscription;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartSubscription = this.cartService.getCart().subscribe((cart: BookType[]) => {
      this.cart = cart;
      console.log(cart)
      this.totalPrice = this.cartService.getTotalPrice(); // Tính lại tổng tiền mỗi khi giỏ hàng thay đổi
    });
  }

  ngOnDestroy() {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  handleMinus(book: BookType) {
    // Xử lý giảm số lượng sản phẩm
    this.cartService.handleMinus(book);
  }

  handlePlus(book: BookType) {
    // Xử lý tăng số lượng sản phẩm
    this.cartService.handlePlus(book);
  }

  removeItem(book: BookType) {
    // Xử lý xóa sản phẩm khỏi giỏ hàng
    this.cartService.removeItemFromCart(book);
  }
}
