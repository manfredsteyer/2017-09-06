
import { async, TestBed } from '@angular/core/testing';
import { FlightBookingModule } from '../flight-booking.module';
import { HttpClientModule } from '@angular/common/http';
import { BASE_URL } from '../../app.tokens';

// Alle Observable-Methoden einbinden
import 'rxjs';

import { FlightSearchComponent } from './flight-search.component';
import { Flight } from '../../entities/flight';
import { Observable } from 'rxjs/Observable';
import { FlightService } from '../flight.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('flightSearchComponent', () => {

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [
        FlightBookingModule, HttpClientTestingModule
      ],
      declarations: [
      ],
      providers: [
        { provide: BASE_URL, useValue: 'http://www.angular.at/api/flight'}
      ]
    }).compileComponents();

  }));

  it('should not have loaded flights initially', () => {
    let fixture = TestBed.createComponent(FlightSearchComponent);
    let comp = fixture.componentInstance;

    expect(comp.flights.length).toBe(0);
  });

  it('should load flights with from and to', () => {
    let fixture = TestBed.createComponent(FlightSearchComponent);
    let comp = fixture.componentInstance;

    comp.form.patchValue({
      from: 'Hamburg',
      to: 'Graz'
    });

    comp.search();

    expect(comp.flights.length).toBe(3);
  });

  it('should not load flights w/o from or to', () => {
    let fixture = TestBed.createComponent(FlightSearchComponent);
    let comp = fixture.componentInstance;

    comp.form.patchValue({
      from: '',
      to: ''
    });

    comp.search();

    expect(comp.flights.length).toBe(0);
  });

})
