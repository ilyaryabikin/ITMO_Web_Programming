import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from './main/main/main.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './auth/auth.guard';
import {NotAuthorizedComponent} from './not-found/not-authorized/not-authorized.component';

const appRoutes: Routes = [
  { path: 'main', canActivate: [AuthGuard], component: MainComponent },
  { path: 'login', component: LoginComponent},
  { path: 'unauthorized', component: NotAuthorizedComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(
      appRoutes
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
