import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { validateEmail } from '../shared/component/common/utils/utils';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  public formdata = { username: '', password: '', confirmPass: '', email: '' };
  submit = false;
  errorMessage = { username: '', password: '', confirmPass: '', email: '' };
  constructor(private auth: AuthService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.auth.canAuthenticate();
  }

  onSubmit() {
    let forErr: any = {};
    const newForm = {
      ...this.formdata,
      username: this.formdata.username.trim(),
      password: this.formdata.password.trim(),
      confirmPass: this.formdata.confirmPass.trim(),
      email: this.formdata.email.trim(),
    };
    if (newForm.username === '') {
      forErr.username = 'Vui lòng nhập tên người dùng!';
    }
    if (newForm.email === '') {
      forErr.email = 'Vui lòng nhập email!';
    } else if (!validateEmail(newForm.email)) {
      forErr.email = 'Vui lòng nhập đúng định dạng email!';
    }
    if (newForm.password === '') {
      forErr.password = 'Vui lòng nhập mật khẩu!';
    }
    if (newForm.confirmPass === '') {
      forErr.confirmPass = 'Vui lòng nhập mật khẩu!';
    } else if (newForm.password !== newForm.confirmPass) {
      forErr.confirmPass = 'Mật khẩu và mật khẩu xác nhận không khớp!';
    }
    if (Object.keys(forErr).length === 0) {
      this.errorMessage = forErr;
      this.auth
        .register(newForm.username, newForm.password,newForm.email)
        .subscribe({
          next: (data) => {
            if (data.status === true) {
              this.formdata = {
                username: '',
                password: '',
                confirmPass: '',
                email: '',
              };
              this.toastr.success(' Thành công!', `${data.text}`);
            } else {
              this.toastr.error(' Không thành công!', `${data.text}`);
            }
          },
          error: (error) => {
            this.toastr.error(' Không thành công!', `${error}`);
          },
        })
        .add(() => {});
    } else {
      this.errorMessage = forErr;
    }
  }
}
