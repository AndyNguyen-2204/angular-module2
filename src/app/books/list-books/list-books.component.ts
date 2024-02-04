import { Component, OnInit } from '@angular/core';
import { BookType } from '../../shared/component/auth/type/book';
import { BookService } from '../../shared/component/auth/book.service';
import { valueDropdown1, valueDropdown2 } from './valueDropdown/valueDropdown';
import { Sort } from '../../shared/component/common/utils/utils';
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
  valueDropdown2 = valueDropdown2;
  public chooseTypeBook: {
    title: string;
    type: string;
  } = {
    title: '',
    type: '',
  };
  public chooseSortBook: {
    title: string;
    type: string;
  } = {
    title: 'Mới nhất',
    type: 'desc',
  };
  constructor(private bookService: BookService) {}
  ngOnInit() {
    this.getBooks();
  }
  getBooks() {
    this.allBooks = Sort(
      this.bookService.getBooks(),
      'publication_year',
      this.chooseSortBook.type
    );
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
      this.allBooks = Sort(
        this.bookService.filterBook(this.valueInput, option.type),
        'publication_year',
        this.chooseSortBook.type
      );
      this.chooseTypeBook = option;
    } else if (dropdown === 'dropdown2') {
      this.isDropdown2Open = false;
      this.allBooks = Sort(
        this.bookService.filterBook(this.valueInput, this.chooseTypeBook.type),
        'publication_year',
        option.type
      );
      this.chooseSortBook = option;
    }
  }
  searchBook() {
    this.allBooks = Sort(
      this.bookService.searchBook(this.valueInput, this.chooseTypeBook.type),
      'publication_year',
      this.chooseSortBook.type
    );
  }
}
