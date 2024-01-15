import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../services/type/user';

@Component({
  selector: 'headerSite',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  constructor(private auth: AuthService) {}
  user: User = { id: 0, userName: '', email: '', phone: '' };
  ngOnInit(): void {
    this.auth.canAccess();
    if (this.auth.isAuthenticated()) {
      const userInfo = localStorage.getItem('userInfo');
      console.log(userInfo);

      this.user = JSON.parse(userInfo as string);
    }
  }
  logout() {
    this.auth.logout();
  }
}
