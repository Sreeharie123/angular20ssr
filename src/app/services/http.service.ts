import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private http = inject(HttpClient);
  private readonly base_url = environment.ApiUrl;

  public httpGET<Response>(endpoint: string, params?: HttpParams): Observable<HttpResponse<Response>> {
    const options = {
      observe: 'response' as const,
      params,
    };
    return this.http.get<Response>(`${this.base_url}${endpoint}`, options);
  }


  public httpPOST<Response, Body>(endpoint: string, body?: Body, params?: HttpParams, option?: any): Observable<HttpResponse<Response>> {
    const options = {
      observe: 'response' as const,
      params,
      responseType: option?.responseType
    };
    return this.http.post<Response>(`${this.base_url}${endpoint}`, body, options);
  }

  public httpPUT<Response, Body>(endpoint: string, body?: Body): Observable<HttpResponse<Response>> {
    const options = {
      observe: 'response' as const,
    };
    return this.http.put<Response>(`${this.base_url}${endpoint}`, body, options);
  }

  public httpPATCH<Response>(endpoint: string): Observable<HttpResponse<Response>> {
    const options = {
      observe: 'response' as const,
    };
    return this.http.patch<Response>(`${this.base_url}${endpoint}`, {}, options);
  }
}
