import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../services/type/user';
import { Router } from '@angular/router';
import { CartService } from '../auth/cart.service';
import { BookType } from '../auth/type/book';
import { Subscription } from 'rxjs';

@Component({
  selector: 'headerSite',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  totalQuantity: number = 0;
  user: User = { id: '', username: '', email: '', phone: '', password: '' };
  private cartSubscription!: Subscription;

  constructor(private auth: AuthService, private cartService: CartService) {}

  ngOnInit(): void {
    this.auth.canAccess();
    if (this.auth.isAuthenticated()) {
      const userInfo = localStorage.getItem('userInfo');
      this.user = JSON.parse(userInfo as string);
    }

    // Đăng ký subscriber để lắng nghe sự kiện thay đổi của giỏ hàng
    this.cartSubscription = this.cartService
      .getCart()
      .subscribe((cart: BookType[]) => {
        this.totalQuantity = cart.reduce(
          (acc, book) => acc + (book.quantity || 0),
          0
        );
      });
  }

  ngOnDestroy(): void {
    // Hủy đăng ký subscriber khi component bị hủy
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  logout() {
    this.auth.logout();
  }
}
