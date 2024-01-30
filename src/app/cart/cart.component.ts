import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from '../shared/component/auth/cart.service';
import { BookType } from '../shared/component/auth/type/book';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  cart: BookType[] = [];
  totalPrice: number = 0;
  private cartSubscription!: Subscription;

  constructor(private cartService: CartService,private toastr: ToastrService) {}

  ngOnInit() {
    this.cartSubscription = this.cartService.getCart().subscribe((cart: BookType[]) => {
      this.cart = cart;
      this.totalPrice = this.cartService.getTotalPrice(); // Tính lại tổng tiền mỗi khi giỏ hàng thay đổi
    });
  }

  ngOnDestroy() {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  handleMinus(book: BookType) {
    this.cartService.handleMinus(book).subscribe({
      next: (data) => {
        if (data.status === true) {
          this.toastr.success(' Thành công!', `${data.text}`);
        } else {
          this.toastr.error(' Không thành công!', `${data.text}`);
        }
      },
      error: (error) => {
        this.toastr.error(' Không thành công!', `${error}`);
      },
    });
  }

  handlePlus(book: BookType) {
    this.cartService.handlePlus(book).subscribe({
      next: (data) => {
        if (data.status === true) {
          this.toastr.success(' Thành công!', `${data.text}`);
        } else {
          this.toastr.error(' Không thành công!', `${data.text}`);
        }
      },
      error: (error) => {
        this.toastr.error(' Không thành công!', `${error}`);
      },
    });
  }

  removeItem(book: BookType) {
    this.cartService.removeItemFromCart(book).subscribe({
      next: (data) => {
        if (data.status === true) {
          this.toastr.success(' Thành công!', `${data.text}`);
        } else {
          this.toastr.error(' Không thành công!', `${data.text}`);
        }
      },
      error: (error) => {
        this.toastr.error(' Không thành công!', `${error}`);
      },
    });
  }
  clearCart() {
    this.cartService.clearCart().subscribe({
      next: (data) => {
        if (data.status === true) {
          this.toastr.success(' Thành công!', `${data.text}`);
        } else {
          this.toastr.error(' Không thành công!', `${data.text}`);
        }
      },
      error: (error) => {
        this.toastr.error(' Không thành công!', `${error}`);
      },
    });
  }
}
