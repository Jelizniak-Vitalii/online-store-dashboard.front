import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { IUser } from '../../models';
import { ApiBaseResponse } from '../../models/api.model';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  constructor(
    private apiService: ApiService,
  ) {}

  login(user: Pick<IUser, 'email' | 'password'>): Observable<ApiBaseResponse<{ token: string }>> {
    return this.apiService.post<ApiBaseResponse<{ token: string }>>('auth/login', user);
  }

  register(user: IUser): Observable<ApiBaseResponse<{ token: string }>> {
    return this.apiService.post<ApiBaseResponse<{ token: string }>>('auth/registration', user);
  }
}
