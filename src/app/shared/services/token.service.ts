import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  constructor(
    private localStorageService: LocalStorageService
  ) {}

  setJwtToken(token: string) {
    this.localStorageService.setItem('token', token);
  }

  removeJwtToken() {
    this.localStorageService.removeItem('token');
  }
}
