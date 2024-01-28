import { Observable, of } from 'rxjs';
import { BookType } from './type/book';

export class CartService {
  public cart: BookType[] = [];
  constructor() {}

  getCart(){
    return this.cart
  }
  addToCart(bookItem: BookType): Observable<{ status: boolean; text: string }> {
    const index = this.cart.findIndex(
      (book: BookType) => book.id === bookItem.id
    );
    if (index > -1) {
      const book = this.cart[index];
      // Nếu cuốn sách đã tồn tại trong giỏ hàng và quantity không phải undefined hoặc null
      if (book && book.quantity && bookItem.quantity) {
        book.quantity += bookItem.quantity;
      }
      return of({ status: true, text: 'Cập nhật giỏ hàng thành công!' });
    } else {
      // Nếu cuốn sách chưa tồn tại trong giỏ hàng, thêm vào giỏ hàng
      this.cart.push(bookItem);
      return of({ status: true, text: 'Đã thêm vào giỏ hàng!' });
    }
  }
  // searchBook(keyword: string) {
  //   if (!keyword.trim()) {
  //     return this.demoBooks;
  //   }
  //   const keywordWithoutDiacritics = this.removeDiacritics(
  //     keyword.toLowerCase()
  //   );
  //   return this.demoBooks.filter((book: BookType) =>
  //     this.removeDiacritics(book.title.toLowerCase()).includes(
  //       keywordWithoutDiacritics
  //     )
  //   );
  // }
  // //removeDiacritics
  // removeDiacritics(str: string): string {
  //   return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  // }
}
