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
import { RegisterComponent } from './register/register.component';
import { SharedModule } from './shared/component/shared.module';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './checkout/checkout.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    RegisterComponent,
    CheckoutComponent
  ],
  imports: [BrowserModule, AppRouter, FormsModule, HttpClientModule,SharedModule,ToastrModule.forRoot(),BrowserAnimationsModule,CommonModule],
  providers: [UserService,AuthService,BookService,CartService],
  bootstrap: [AppComponent],
})
export class AppModule {}
