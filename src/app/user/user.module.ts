import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
// import { CreateUserComponent } from './create/create.component';
import { ListUsersComponent } from './list/listUser.component';
import { UserComponent } from './user.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog'; // Import DialogModule
import { TableModule } from 'primeng/table'; // Import TableModule

const routes: Routes = [
    {
      path: '',
      component: UserComponent,
      children: [
        { path: '', component: ListUsersComponent },
      ]
    }
];

  @NgModule({
    declarations: [
      ListUsersComponent,
      UserComponent
    ],
    imports: [
      CommonModule,
      ReactiveFormsModule,
      RouterModule.forChild(routes),
      FormsModule,
      DialogModule, // Add DialogModule here
      TableModule,
    ],
    providers: [
    ],
  })
  export class UserModule { }
