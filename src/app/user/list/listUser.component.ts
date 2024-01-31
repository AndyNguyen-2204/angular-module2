import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../shared/component/auth/type/user';
import { UserService } from '../../shared/component/auth/user.service';
import { ToastrService } from 'ngx-toastr';
import {
  generateRandomId,
  roles,
} from '../../shared/component/common/utils/utils';

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
  showDropdown: boolean = false;
  valueDropdown = roles;
  useInfor: any = {};
  public userForm = {
    username: '',
    password: '',
    email: '',
    role: 'admin',
    id: '',
  };

  constructor(private userService: UserService, private toastr: ToastrService) {
    this.reloadList();
  }

  ngOnInit() {
    this.allUsers = this.userService.demoUsers;
    const userInfoString = localStorage.getItem('userInfo');

    if (userInfoString) {
      const userInfoObject = JSON.parse(userInfoString as string);
      this.useInfor = userInfoObject;
    }
  }

  onSubmit() {
    if (this.userForm.username.trim() === '') {
      this.errorMessage.username = 'Vui lòng nhập tên người dùng!';
    } else if (this.userForm.password.trim() === '') {
      this.errorMessage.password = 'Vui lòng nhập mật khẩu!';
    } else if (this.userForm.email.trim() === '') {
      this.errorMessage.email = 'Vui lòng nhập email!';
    } else if (this.type === 'add') {
      const newForm = { ...this.userForm, id: generateRandomId() };
      this.userService.createUser(newForm).subscribe({
        next: (data) => {
          if (data.success === true) {
            this.reloadList();
            this.hideDialog();
            this.errorMessage = { username: '', password: '', email: '' };
            this.toastr.success(' Thành công!', `Thêm mới user thành công!`);
          } else {
            this.toastr.error(' Không thành công!', `${data.reason}`);
          }
        },
        error: (error) => {
          this.toastr.error(' Không thành công!', `${error}`);
        },
      });
    } else if (this.type === 'edit') {
      this.userService.editUser(this.userForm).subscribe({
        next: (data) => {
          if (data.success === true) {
            this.reloadList();
            this.hideDialog();
            this.errorMessage = { username: '', password: '', email: '' };
            this.toastr.success(' Thành công!', `Chỉnh sửa user thành công!`);
          } else {
            this.toastr.error(' Không thành công!', `${data.reason}`);
          }
        },
        error: (error) => {
          this.toastr.error(' Không thành công!', `${error}`);
        },
      });
    }
  }

  removeUser(id: string): void {
    this.userService.removeUser(id).subscribe({
      next: (data) => {
        if (data.success === true) {
          this.toastr.success(' Thành công!', `Xóa user thành công!`);
        } else {
          this.toastr.error(' Không thành công!', `${data.reason}`);
        }
      },
      error: (error) => {
        this.toastr.error(' Không thành công!', `${error}`);
      },
    });
  }

  reloadList() {
    this.allUsers = this.userService.demoUsers;
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
    const findUser = this.userService.demoUsers.find((el: UserModel) => el.id === idUser);
    if (findUser) {
      this.userForm = findUser;
      this.showDialog();
    } else {
      this.toastr.error(' Không thành công!', `User không tồn tại!`);
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
  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  selectOption(option: string) {
    this.userForm.role = option;
    this.showDropdown = false;
  }
  changeValueInput(event:any){
    const { name, value } = event.target;
    this.userForm={...this.userForm,[name]:value}
  }
}
