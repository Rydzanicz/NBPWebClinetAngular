import {Injectable, Injector} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NBPService {
  private apiUrl = 'http://localhost:8080';
  private apiKey = '';
  private http: HttpClient | undefined;

  constructor(private injector: Injector) {
  }

  private getHttp(): HttpClient {
    if (!this.http) {
      this.http = this.injector.get(HttpClient);
    }
    return this.http;
  }

  getLast100CurrencyValue(requestData: any, page: number, size: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-API-KEY': this.apiKey
    });

    return this.getHttp().get(`${this.apiUrl}/get-last-hundred`, {
      headers,
      params: {
        ...requestData,
        page: page.toString(),
        size: size.toString()
      },
      responseType: 'text' as 'json'
    });
  }
}
