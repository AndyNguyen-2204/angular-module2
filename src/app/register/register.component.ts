import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  public formdata = { username: '', password: '', confirmPass: '' };
  submit = false;
  errorMessage = { username: '', password: '', confirmPass: '' };
  registerMessageError = '';
  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.auth.canAuthenticate();
  }

  onSubmit() {
    if (this.formdata.username.trim() === '') {
      this.errorMessage.username = 'Vui lòng nhập tên người dùng.';
    } else if (this.formdata.password.trim() === '') {
      this.errorMessage.password = 'Vui lòng nhập mật khẩu.';
    }else if(this.formdata.confirmPass.trim() === ''){
      this.errorMessage.confirmPass = 'Vui lòng nhập mật khẩu.';
    }else if(this.formdata.confirmPass.trim() !== this.formdata.password.trim()){
      this.errorMessage.confirmPass = 'Mật khẩu và mật khẩu xác nhận không khớp!';
    } else {
      (this.errorMessage.username = ''),
        (this.errorMessage.password = ''),
        (this.errorMessage.confirmPass = ''),
        this.auth
          .register(this.formdata.username, this.formdata.password)
          .subscribe({
            next: (data) => {
              if(data.status===true){
                this.formdata={ username: '', password: '', confirmPass: '' }
                alert(data.text)
              }else{
                alert(data.text)
              }
            },
            error: (error) => {
              console.log(error);
              this.registerMessageError = error;
            },
          })
          .add(() => {
           
          });
    }
  }
}
