import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../shared/component/auth/type/user';
import { UserService } from '../../shared/component/auth/user.service';

@Component({
  selector: 'listUsersComponent',
  templateUrl: './listUser.component.html',
  styleUrls: ['./listUser.component.scss'],
})
export class ListUsersComponent implements OnInit {
  allUsers: UserModel[] = [];
  showModal: boolean = false;
  visible: boolean = false;
  submit = false;
  errorMessage = { username: '', password: '', email: '' };
  type = 'add';
  public userForm = {
    username: '',
    password: '',
    email: '',
    role: 'admin',
    id: '',
  };

  constructor(private authService: UserService) {
    this.reloadList();
  }

  ngOnInit() {
    this.allUsers = this.authService.demoUsers;
  }

  onSubmit() {
    if (this.userForm.username.trim() === '') {
      this.errorMessage.username = 'Vui lòng nhập tên người dùng!';
    } else if (this.userForm.password.trim() === '') {
      this.errorMessage.password = 'Vui lòng nhập mật khẩu!';
    } else if (this.userForm.email.trim() === '') {
      this.errorMessage.email = 'Vui lòng nhập email!';
    } else if (this.type === 'add') {
      const newForm = { ...this.userForm, id: this.generateRandomId() };
      this.authService.createUser(newForm).subscribe({
        next: (data) => {
          if (data.success === true) {
            this.reloadList();
            this.hideDialog();
            alert('Thêm mới user thành công!');
          } else {
            alert(data.reason);
          }
        },
        error: (error) => {
          alert(error.message);
        },
      });
    } else if (this.type === 'edit') {
      this.authService.editUser(this.userForm).subscribe({
        next: (data) => {
          if (data.success === true) {
            this.reloadList();
            this.hideDialog();
            alert('Chỉnh sửa user thành công!');
          } else {
            alert(data.reason);
          }
        },
        error: (error) => {
          alert(error.message);
        },
      });
    }
  }

  removeUser(id: string): void {
    this.authService.removeUser(id).subscribe({
      next: (data) => {
        if (data.success === true) {
          alert('Thành công');
        } else {
          alert(data.reason);
        }
      },
      error: (error) => {
        alert(error.message);
      },
    });
  }

  reloadList() {
    this.allUsers = this.authService.demoUsers;
  }
  showDialog() {
    this.visible = true;
  }
  createUser() {
    this.showDialog();
    this.type = 'add';
  }
  editUser(idUser: string) {
    this.type = 'edit';
    const findUser = this.allUsers.find((el: UserModel) => el.id === idUser);
    if (findUser) {
      this.userForm = findUser;
      this.showDialog();
    } else {
      alert('User không tồn tại!');
    }
  }
  hideDialog() {
    this.visible = false;
    this.resetForm();
  }
  resetForm() {
    this.userForm = {
      username: '',
      password: '',
      email: '',
      role: 'admin',
      id: '',
    };
  }
  generateRandomId() {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }
}
