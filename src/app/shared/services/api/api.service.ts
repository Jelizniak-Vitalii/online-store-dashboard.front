import { catchError, finalize, map, Observable, of, switchMap, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../../environments/environments';
import { PopupService } from '../popup.service';
import { ApiBaseResponse } from '../../models/api.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly url: string = environment.config.apiUrl;

  constructor(
    private http: HttpClient,
    private popupService: PopupService
  ) {}

  private getHeaders(path?: string): Observable<HttpHeaders> {
    const headers: { [key: string]: string; } = {}

    return of(new HttpHeaders(headers));
  }

  private toHttpParams(params: any): HttpParams {
    return Object.getOwnPropertyNames(params)
      .reduce((p, key) => p.set(key, params[key]), new HttpParams());
  }

  private handleError<T extends ApiBaseResponse<T>>(error: any, withoutErrorMessage?: boolean, errorMessage: string = 'Something went wrong!') {
    if (!withoutErrorMessage) {
      this.showErrorMessage(error.error?.message ?? errorMessage);
    }

    return throwError(() => new Error(error));
  }

  private showErrorMessage(message: string) {
    this.popupService.showErrorMessage(message);
  }

  get<T>(
    path: string,
    params: Object = {},
    withoutSpinner?: boolean,
    withoutErrorMessage?: boolean,
    errorMessage?: string
  ): Observable<any> {
    return this.getHeaders(path)
      .pipe(
        switchMap((headers: HttpHeaders) => this.http.get<ApiBaseResponse<T>>(
            `${this.url}/${path}`,
            {headers, params: this.toHttpParams(params)}
          )
            .pipe(
              map(response => {
                if (!response.success) {
                  throw new Error(response.message);
                }

                return response;
              })
            )
        ),
        catchError(error => this.handleError(error, withoutErrorMessage, errorMessage)),
        finalize(() => {
        })
      );
  }

  post<T>(
    path: string,
    body: Object = {},
    withoutSpinner?: boolean,
    withoutErrorMessage?: boolean,
    errorMessage?: string
  ): Observable<any> {
    return this.getHeaders()
      .pipe(
        switchMap((headers: HttpHeaders) => this.http.post<ApiBaseResponse<T>>(
            `${this.url}/${path}`,
            body,
            {headers, withCredentials: environment.production}
          )
            .pipe(
              map(response => {
                if (!response.success) {
                  throw new Error(response.message);
                }

                return response;
              })
            )
        ),
        catchError(error => this.handleError(error, withoutErrorMessage, errorMessage)),
        finalize(() => {
        })
      );
  }
}
