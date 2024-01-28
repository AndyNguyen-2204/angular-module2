import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
// import { CreateUserComponent } from './create/create.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog'; // Import DialogModule
import { TableModule } from 'primeng/table'; // Import TableModule
import { CartComponent } from './cart.component';
const routes: Routes = [
  {
    path: '',
    component: CartComponent,
  },
];

@NgModule({
  declarations: [CartComponent],
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
export class CartModule {}
