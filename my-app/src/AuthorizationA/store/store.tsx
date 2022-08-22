import { makeAutoObservable } from 'mobx';
import { authService } from '../services/AuthService';


export class Store {
  isAuth = false;

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool: boolean) {
    this.isAuth = bool;
  }

  addUserData(token: string, name: string, id: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('userName', name);
    localStorage.setItem('userId', id);
  }

  removeUserData() {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');
  }

  async login(email: string, password: string) {
    try {
      const response = await authService.login(email, password);
      this.addUserData(response.data.token, response.data.name, response.data.userId);
      this.setAuth(true);
    } catch (error) {
      console.log(error)
    }
  }

  async registration(name: string, email: string, password: string) {
    try {
      await authService.registration(name, email, password);
    }
    catch(error) {
      console.log(error)
    }
  }

  logout() {
    this.removeUserData();
  }
}
