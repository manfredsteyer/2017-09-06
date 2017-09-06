import { Component, OnInit } from '@angular/core';
import { Flight } from '../../entities/flight';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FlightService } from '../flight.service';

@Component({
  selector: 'flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css'],
  providers: [FlightService]
})
export class FlightSearchComponent implements OnInit {

  from: string;
  to: string;
  flights: Array<Flight> = [];
  selectedFlight: Flight;


  constructor(private flightService: FlightService) {
    // this.http = http;
  }

  search(): void {

    this.flightService
        .find(this.from, this.to)
        .subscribe(
          flights => {
            this.flights = flights;
          },
          err => {
            console.error('Fehler beim Laden', err);
          }
        );

  }

  select(f: Flight): void {
    this.selectedFlight = f;
  }

  ngOnInit() {
    console.debug('komponente wurde erzeugt!')
  }



}
