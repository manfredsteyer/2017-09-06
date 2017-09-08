import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Flight } from '../entities/flight';
import { BASE_URL } from '../app.tokens';
import { environment } from '../../environments/environment';

@Injectable()
export class FlightService {

  constructor(
    private http: HttpClient,
    @Inject(BASE_URL) private baseUrl: string
  ) {
    console.debug('Liebesgrüße aus dem Ctor!')
  }

  find(from: string, to: string): Observable<Flight[]> {
    let url = this.baseUrl + '/flight';

    let params = new HttpParams()
      .set('from', from)
      .set('to', to);

    let headers = new HttpHeaders()
      .set('Accept', 'application/json');

    return this.http.get<Flight[]>(url, {params, headers});
  }

  flights: Flight[] = [];

  load(from: string, to: string): void {
    let url = this.baseUrl + '/flight';

    let params = new HttpParams()
      .set('from', from)
      .set('to', to);

    let headers = new HttpHeaders()
      .set('Accept', 'application/json');

    this
      .http
      .get<Flight[]>(url, {params, headers})
      .subscribe(
        flights => {
          this.flights = flights;
        },
        err => console.error('Fehler beim Laden', err)
      )

  }


}
