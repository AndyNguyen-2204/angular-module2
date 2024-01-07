import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public formdata = { username: '', password: '' };
  submit = false;
  errorMessage = { username: '', password: '' };
  loginMessageError = '';
  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.auth.canAuthenticate();
  }

  onSubmit() {
    if (this.formdata.username.trim() === '') {
      this.errorMessage.username = 'Vui lòng nhập tên người dùng.';
    } else if (this.formdata.password.trim() === '') {
      this.errorMessage.password = 'Vui lòng nhập mật khẩu.';
    } else {
      (this.errorMessage.username = ''),
        (this.errorMessage.password = ''),
        this.auth
          .login(this.formdata.username, this.formdata.password)
          .subscribe({
            next: (data) => {
              this.auth.storeToken(data.token);
              this.auth.storeInfo(data.this);
              this.auth.canAuthenticate();
            },
            error: (error) => {
              console.log(error);
              this.loginMessageError = error;
            },
          })
          .add(() => {
            console.log('login process completed!');
          });
    }
  }
}
