import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
// import { CreateUserComponent } from './create/create.component';
import { ListBooksComponent } from './list-books/list-books.component';
import { BooksComponent } from './books.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog'; // Import DialogModule
import { TableModule } from 'primeng/table'; // Import TableModule
import { BookdetailComponent } from './bookdetail/bookdetail.component';
const routes: Routes = [
  {
    path: '',
    component: BooksComponent,
    children: [
      { path: '', component: ListBooksComponent },
      { path: ':id', component: BookdetailComponent },
    ],
  },
];

@NgModule({
  declarations: [ListBooksComponent, BooksComponent, BookdetailComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    FormsModule,
    DialogModule, // Add DialogModule here
    TableModule,
  ],
  providers: [],
})
export class BooksModule {}
