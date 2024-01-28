import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../services/type/user';
import { Router } from '@angular/router';
import { CartService } from '../auth/cart.service';
import { BookType } from '../auth/type/book';

@Component({
  selector: 'headerSite',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  totalQuantity: number = 0;
  user: User = { id: 0, userName: '', email: '', phone: '' };
  constructor(private auth: AuthService,private cartService:CartService) {}
  ngOnInit(): void {
    this.auth.canAccess();
    if (this.auth.isAuthenticated()) {
      const userInfo = localStorage.getItem('userInfo');
      this.user = JSON.parse(userInfo as string);
    }
    this.totalQuantity = this.cartService.cart.reduce((acc, book: BookType) => {
      return acc + (book.quantity || 0);
    }, 0); // Khởi tạo acc = 0
  }
  logout() {
    this.auth.logout();
  }
}
