import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';
import { BookType } from './type/book';

export class CartService {
  private cart: BookType[] = [];
  private cartSubject = new BehaviorSubject<BookType[]>([]);
  private cartSercive = this.cartSubject.asObservable();

  constructor() {}

  getCart(): Observable<BookType[]> {
    return this.cartSercive;
  }

  addToCart(bookItem: BookType): Observable<{ status: boolean; text: string }> {
    const index = this.cart.findIndex(
      (book: BookType) => book.id === bookItem.id
    );
    if (index > -1) {
      const book = this.cart[index];
      if (book && book.quantity && bookItem.quantity) {
        book.quantity += bookItem.quantity;
      }
      this.cartSubject.next([...this.cart]); // Phát ra sự kiện thay đổi giỏ hàng
      return of({ status: true, text: 'Cập nhật giỏ hàng thành công!' });
    } else {
      this.cart.push(bookItem);
      this.cartSubject.next([...this.cart]); // Phát ra sự kiện thay đổi giỏ hàng
      return of({ status: true, text: 'Đã thêm vào giỏ hàng!' });
    }
  }

  getTotalPrice() {
    return this.cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }

  handleMinus(
    bookItem: BookType
  ): Observable<{ status: boolean; text: string }> {
    const index = this.cart.findIndex(
      (book: BookType) => book.id === bookItem.id
    );
    if (index > -1) {
      const book = this.cart[index];
      if (book && book.quantity) {
        if (book.quantity > 1) {
          book.quantity -= 1;
        } else {
          this.cart.splice(index, 1);
        }
      }
      this.cartSubject.next([...this.cart]); // Phát ra sự kiện thay đổi giỏ hàng
      return of({ status: true, text: 'Cập nhật giỏ hàng thành công!' });
    } else {
      return of({ status: false, text: 'Không có sản phẩm có id trùng khớp!' });
    }
  }

  handlePlus(
    bookItem: BookType
  ): Observable<{ status: boolean; text: string }> {
    const index = this.cart.findIndex(
      (book: BookType) => book.id === bookItem.id
    );
    if (index > -1) {
      const book = this.cart[index];
      if (book && book.quantity) {
        book.quantity += 1;
      }
      this.cartSubject.next([...this.cart]); // Phát ra sự kiện thay đổi giỏ hàng
      return of({ status: true, text: 'Cập nhật giỏ hàng thành công!' });
    } else {
      return of({ status: false, text: 'Không có sản phẩm có id trùng khớp!' });
    }
  }

  removeItemFromCart(
    bookItem: BookType
  ): Observable<{ status: boolean; text: string }> {
    const index = this.cart.findIndex(
      (book: BookType) => book.id === bookItem.id
    );
    if (index > -1) {
      this.cart.splice(index, 1);
      this.cartSubject.next([...this.cart]); // Phát ra sự kiện thay đổi giỏ hàng
      return of({
        status: true,
        text: 'Xóa sản phẩm khỏi giỏ hàng thành công!',
      });
    } else {
      return of({ status: false, text: 'Không có sản phẩm có id trùng khớp!' });
    }
  }
}
