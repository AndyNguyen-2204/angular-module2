import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRouter } from './app.routes.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
    declarations: [AppComponent, LoginComponent],
    imports: [BrowserModule, AppRouter, FormsModule,
        HttpClientModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule { }