import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {ToastModule} from 'primeng/toast';

import {AppComponent} from './app.component';
import {CreatePointComponent} from './main/create-point/create-point.component';
import {ButtonModule, CheckboxModule, InputTextModule, MessageService, PasswordModule, TableModule} from 'primeng';
import {CanvasItemComponent} from './main/canvas-item/canvas-item.component';
import {TableItemComponent} from './main/table-item/table-item.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MainComponent} from './main/main/main.component';
import {RouterModule} from '@angular/router';
import {NotFoundComponent} from './not-found/not-found.component';
import {LoginComponent} from './login/login.component';
import {AppRoutingModule} from './app-routing.module';
import {PointService} from './services/point.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {TokenInterceptor} from './interceptors/token.interceptor';
import {AuthService} from './services/auth.service';
import {BooleanToText} from './pipes/boolean-to-text.pipe';
import {NotAuthorizedComponent} from './not-found/not-authorized/not-authorized.component';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    CreatePointComponent,
    CanvasItemComponent,
    TableItemComponent,
    MainComponent,
    NotFoundComponent,
    LoginComponent,
    BooleanToText,
    NotAuthorizedComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    CheckboxModule,
    ButtonModule,
    InputTextModule,
    TableModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    PasswordModule,
    HttpClientModule,
    ToastModule
  ],
  providers: [
    PointService,
    AuthService,
    MessageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
