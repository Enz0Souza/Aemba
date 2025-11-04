import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = false;

 login(username: string, password: string): boolean {
  if (username === 'admin' && password === '1234') {
    sessionStorage.setItem('loggedIn', 'true');
    return true;
  }
  return false;
}

checkLogin(): boolean {
  return sessionStorage.getItem('loggedIn') === 'true';
}


  logout() {
    this.isLoggedIn = false;
    sessionStorage.removeItem('loggedIn');
  }
}
