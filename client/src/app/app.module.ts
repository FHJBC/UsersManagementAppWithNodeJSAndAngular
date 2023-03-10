import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AddUserComponent } from './components/add-user/add-user.component';
import { AdminBoardComponent } from './components/admin-board/admin-board.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { UserBoardComponent } from './components/user-board/user-board.component';
import { ViewUserComponent } from './components/view-user/view-user.component';

import { authInterceptorProviders } from './helpers/auth.interceptor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    AddUserComponent,
    ViewUserComponent,
    EditUserComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    HomeComponent,
    UserBoardComponent,
    AdminBoardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
