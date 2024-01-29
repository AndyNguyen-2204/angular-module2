import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRouter } from './app.routes.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './shared/component/header/header.component';
import { UserService } from './shared/component/auth/user.service';
import { AuthService } from './services/auth.service';
import { BookService } from './shared/component/auth/book.service';
import { CartService } from './shared/component/auth/cart.service';
import { CartModule } from './cart/cart.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    DashboardComponent,
  ],
  imports: [BrowserModule, AppRouter, FormsModule, HttpClientModule],
  providers: [UserService,AuthService,BookService],
  bootstrap: [AppComponent],
})
export class AppModule {}
