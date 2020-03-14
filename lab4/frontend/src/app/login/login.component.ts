import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {MessageService} from 'primeng';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  constructor(private authService: AuthService,
              private router: Router,
              private messageService: MessageService) { }

  ngOnInit() {
  }

  login(authForm) {
    if (authForm.valid) {
      this.authService.login({
        login: this.username,
        password: this.password
      }).subscribe((result: any) => {
        if (result.token) {
          localStorage.setItem('token', result.token);
          this.router.navigate(['main']);
        }
      }, (error) => {
        if (error.status >= 500 || error.status === 0) {
          this.messageService.add({severity: 'error', summary: 'Ой! Сервер больно упал'});
        }
        if (error.status <= 400 && error.status >= 300) {
          this.messageService.add({severity: 'error', summary: 'Такого пользователя не существует'});
        }
      });
    } else {
      this.handleInvalid();
    }
  }

  register(authForm) {
    if (authForm.valid) {
      this.authService.register({
        login: this.username,
        password: this.password
      }).subscribe((result: any) => {
        this.messageService.add({severity: 'success', summary: `Пользователь ${this.username} зарегистрирован`});
      }, (error) => {
        if (error.status >= 500 || error.status === 0) {
          this.messageService.add({severity: 'error', summary: 'Ой! Сервер больно упал'});
        }
        if (error.status <= 400 && error.status >= 300) {
          this.messageService.add({severity: 'error', summary: 'Такой пользователь уже существует'});
        }
      });
    } else {
      this.handleInvalid();
    }
  }

  handleInvalid() {
    if (this.password.length < 6) {
      this.messageService.add({severity: 'error', summary: 'Пароль короче 6 символов'});
    }
    if (this.password.length === 0) {
      this.messageService.add({severity: 'error', summary: 'Введите логин'});
    }
    if (this.password.length === 0) {
      this.messageService.add({severity: 'error', summary: 'Введите пароль'});
    }
  }
}
