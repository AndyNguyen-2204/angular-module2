import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { User } from './type/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public users:User[] = [];
  constructor(private router: Router, private http: HttpClient) {}
  isAuthenticated(): boolean {
    if (localStorage.getItem('token') !== null) {
      return true;
    }
    return false;
  }

  canAccess() {
    if (!this.isAuthenticated()) {
      localStorage.setItem('redirectUrl', this.router.url);
      this.router.navigate(['/login']);
    }
  }
  canAuthenticate() {
    if (this.isAuthenticated()) {
      //redirect to dashboard
      const redirectUrl = localStorage.getItem('redirectUrl');
      if (redirectUrl) {
        this.router.navigate([redirectUrl]);
      } else {
        this.router.navigate(['/dashboard/users']);
      }
    }
  }

  storeToken(token: string) {
    localStorage.setItem('token', token);
  }
  storeInfo(user: User) {
    localStorage.setItem('userInfo', JSON.stringify(user));
  }
  login(username: string, password: string): Observable<any> {
    const userLogin = this.users.find(
      (user) => user.username === username && user.password === password
    );
    if (userLogin) {
      return of({
        token:
          'AJDLj6K2dIsMl69Tkiyib0geoABTzrRJSFB8GsaMLtNNxaS8VVcMf7Zf95s8NsOyGvIvr6AoOWVSG_t6PnJ2I4_W8RHLBB7rJV0cV4LvNTBogtZOC_Nz2z0',
        message: 'Login Success',
        this: {
          id: userLogin.id,
          userName: userLogin.username,
          email: userLogin.email,
          phone: userLogin.phone,
        },
      });
    } else {
      return throwError('Đăng nhập thất bại! Vui lòng thử lại');
    }
  }
  register(username: string, password: string): Observable<{status:boolean,text:string}> {
    const userLogin = this.users.find(
      (user) => user.username === username && user.password === password
    );
    if (userLogin) {
      return of({
        status:false,
        text:"Đăng ký thất bại! Tên đăng nhập đã tồn tại."
      });
    } else {
      this.users.push({
        username:username,
        password:password,
        role:"admin",
        id:this.generateRandomId()
      })
      return of({
        status:true,
        text:"Đăng ký thành công!"
      })
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    localStorage.removeItem('redirectUrl');
    this.router.navigate(['/login']);
  }
  generateRandomId() {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }
}
