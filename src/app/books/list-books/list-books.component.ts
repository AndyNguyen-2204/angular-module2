import { Component, OnInit } from '@angular/core';
import { BookType } from '../../shared/component/auth/type/book';
import { BookService } from '../../shared/component/auth/book.service';
import { valueDropdown1 } from './valueDropdown/valueDropdown';
@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.component.html',
  styleUrls: ['./list-books.component.scss'],
})
export class ListBooksComponent implements OnInit {
  allBooks: BookType[] = [];
  isDropdown1Open: boolean = false;
  isDropdown2Open: boolean = false;
  valueInput: string = '';
  valueDropdown1 = valueDropdown1;
  chooseTypeBook: {
    title?: string;
    type?: string;
  } = {};
  constructor(private bookService: BookService) {}
  ngOnInit() {
    this.getBooks();
  }
  getBooks() {
    this.allBooks = this.bookService.getBooks();
  }
  toggleDropdown(dropdown: string) {
    if (dropdown === 'dropdown1') {
      this.isDropdown1Open = !this.isDropdown1Open;
      this.isDropdown2Open = false;
    } else if (dropdown === 'dropdown2') {
      this.isDropdown2Open = !this.isDropdown2Open;
      this.isDropdown1Open = false;
    }
  }

  selectOption(option: { title: string; type: string }, dropdown: string) {
    if (dropdown === 'dropdown1') {
      this.isDropdown1Open = false;
      this.chooseTypeBook = option;
    } else if (dropdown === 'dropdown2') {
      this.isDropdown2Open = false;
    }
  }
  searchBook() {
    this.allBooks = this.bookService.searchBook(this.valueInput);
  }
}
