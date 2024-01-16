import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../shared/component/auth/type/user';
import { UserService } from '../../shared/component/auth/user.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateUserComponent } from '../addUser/addUser.component';

// import { AuthService } from '../../../services/auth.service';
// import { User } from '../../../services/type/user';

@Component({
  selector: 'listUsersComponent',
  templateUrl: './listUser.component.html',
  styleUrl: './listUser.component.scss',
})
export class ListUsersComponent {
  allUsers: UserModel[] = [];
  showModal: boolean = false;
  constructor(private authService: UserService, public dialog: MatDialog) {}

  ngOnInit() {
    this.allUsers === this.authService.demoUsers;
  }
  removeUser(username: string): void {
    this.authService.removeUser(username);
  }
  editUser(username: any): void {
    this.showModal = !this.showModal;
    this.authService.editUser(username);
    const dialogRef = this.dialog.open(CreateUserComponent, {
      data: { username },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  createUser(username: any): void {
    this.showModal = !this.showModal;
    this.authService.editUser(username);
  }
}
