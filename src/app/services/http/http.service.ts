import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_URL } from 'src/app/constants/api.constant';
import { IExchabgeRateFull } from 'src/app/interfaces/exchange-rate.interface';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  getRate(): Observable<IExchabgeRateFull[]> {
    return this.http.get<IExchabgeRateFull[]>(API_URL);
  }
}
