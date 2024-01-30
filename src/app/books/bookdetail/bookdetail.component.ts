import { Component, OnInit } from '@angular/core';
import { BookService } from '../../shared/component/auth/book.service';
import { ActivatedRoute } from '@angular/router';
import { BookType } from '../../shared/component/auth/type/book';
import { CartService } from '../../shared/component/auth/cart.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-bookdetail',
  templateUrl: './bookdetail.component.html',
  styleUrl: './bookdetail.component.scss',
})
export class BookdetailComponent implements OnInit {
  dataBookDetail: BookType = {
    id: '',
    title: '',
    author: '',
    price: 0,
    quantity_available: 0,
    cover_image: '',
    genre: {
      title: '',
      type: '',
    },
    description: '',
    publication_year: 0,
    rating: 0,
    quantity: 0,
    // Các thuộc tính khác của đối tượng BookType
  };
  quantity: number = 1;
  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private cartService: CartService,
    private toastr: ToastrService
  ) {}
  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        // Call your function with the ID here
        this.getBookDetail(id);
      } else {
        this.toastr.error(' Không thành công!', `Id book không tồn tại!`);
      }
    });
  }
  getBookDetail(id: string) {
    this.bookService.getBookDetail(id).subscribe({
      next: (data) => {
        if (data.status === true && data.data) {
          this.dataBookDetail = data?.data;
        } else {
          this.toastr.error(' Không thành công!', `${data.text}`);
        }
      },
      error: (error) => {
        this.toastr.error(' Không thành công!', `${error.message}`);
      },
    });
  }
  handleMinus() {
    this.quantity -= 1;
  }
  handlePlus() {
    this.quantity += 1;
  }
  addToCart() {
    const book = {
      ...this.dataBookDetail,
      quantity: this.quantity,
    };
    this.cartService.addToCart(book).subscribe({
      next: (data) => {
        if (data.status === true) {
          this.toastr.success('Thành công!', `${data.text}`);
        } else {
          alert(data.text);
          this.toastr.error(' Không thành công!', `${data.text}`);
        }
      },
      error: (error) => {
        this.toastr.error(' Không thành công!', `${error.message}`);
      },
    });
  }
}
