import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { UserBoardComponent } from './components/user-board/user-board.component';
// import { ModeratorBoardComponent } from './components/moderator-board/moderator-board.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { AdminBoardComponent } from './components/admin-board/admin-board.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { ViewUserComponent } from './components/view-user/view-user.component';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'user', component: UserBoardComponent },
    // { path: 'mod', component: ModeratorBoardComponent },
    { path: 'admin', component: AdminBoardComponent },
    { path: 'ViewUser/:userId', component: ViewUserComponent },
    { path: 'AddUser', component: AddUserComponent },
    { path: 'EditUser/:userId', component: EditUserComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
