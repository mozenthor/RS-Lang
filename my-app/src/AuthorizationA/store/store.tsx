import { makeAutoObservable } from 'mobx';
import { authService } from '../services/AuthService';

export class Store {
  isLoginRegistration = true;

  isAuth = false;

  message = '';

  constructor() {
    makeAutoObservable(this);
  }

  addUserData(token: string, name: string, id: string, refreshToken: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('userName', name);
    localStorage.setItem('userId', id);
    localStorage.setItem('refreshToken', refreshToken);
  }

  removeUserData() {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');
    localStorage.removeItem('refreshToken');
  }

  async login(email: string, password: string) {
    try {
      const response = await authService.login(email.toLowerCase(), password);
      this.setAuth(true);
      this.addUserData(response.data.token, response.data.name, response.data.userId, response.data.refreshToken);
      this.setMessage('');
    } catch (error) {
      this.setMessage('Неверный логин или пароль!');
    }
  }

  async registration(name: string, email: string, password: string) {
    try {
      await authService.registration(name, email.toLowerCase(), password);
      this.login(email, password)
    }
    catch(error) {
      const statusCode = (error as ErrorInterface).response.status;
      if(statusCode === 422 && (name.length === 0 || email.length === 0 || password.length === 0)) {
        this.setMessage('Заполните все поля');
      }
      if(statusCode === 422 && password.length < 8) {
        this.setMessage('Пароль должен содержать не менее 8 символов');
      } else if(statusCode === 422) {
        this.setMessage('Не валидный адрес электронной почты');
      }
      if(statusCode === 417) {
        this.setMessage('Аккаунт с такой почтой уже существует');
      }
    }
  }

  logout() {
    this.setAuth(false);
    this.removeUserData();
  }

  setLogReg(bool: boolean) {
    this.isLoginRegistration = bool;
  }

  setAuth(bool: boolean) {
    this.isAuth = bool;
  }

  async checkAuth() {
    try {
      const userId = localStorage.getItem('userid') as string;
      const refreshToken = localStorage.getItem('token') as string;
      const response = await authService.getNewToken(userId, refreshToken);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('refreshToken', response.data.refreshToken);
    }
    catch(error) {
      console.log(error);
    }
  }

  setMessage(message: string) {
    this.message = message;
  }
}

interface ErrorInterface {
  response: {
    status: number
  }
}
