import { Component, OnInit } from '@angular/core';
import { Flight } from '../../entities/flight';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FlightService } from '../flight.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CityValidator } from '../../shared/validation/city.validator';

@Component({
  selector: 'flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css'],
  providers: []
})
export class FlightSearchComponent implements OnInit {

  // flights: Array<Flight> = [];
  selectedFlight: Flight;
  form: FormGroup;

  basket: object = {
    "3": true,
    "4": false,
    "5": true
  }

  constructor(
    private flightService: FlightService,
    private fb: FormBuilder,
    private http: HttpClient
  )
  {

    this.form = fb.group({
      from: [
        'Graz',
        [
          Validators.required,
          Validators.minLength(3),
          CityValidator.validate,
          CityValidator.validateWithParams(['Graz', 'Hamburg', 'Nürnberg', 'Berlin'])
        ],
        [
          CityValidator.validateAsync(http)
        ]
      ],
      to: ['Hamburg']
    });

    this.form.validator = Validators.compose([CityValidator.validateForm]);

    // this.form.valid;
    // this.form.dirty;
    // this.form.controls['from'].valid
    // this.form.controls['from'].value;
    // this.form.value; --> { from: 'Graz, to: 'Hamburg' }

    this.form.valueChanges.subscribe(v => {
      console.debug('form changed', v);
    });

    this.form.controls['from'].valueChanges.subscribe(v => {
      console.debug('field from changed', v);
    });

  }

  get flights() { // flights.length, flights[0],
    return this.flightService.flights;
  }

  search(): void {

    if (!this.form.value.from || !this.form.value.to) return;
    this.flightService.load(this.form.value.from, this.form.value.to);

  }

  select(f: Flight): void {
    this.selectedFlight = f;
  }

  ngOnInit() {
    console.debug('komponente wurde erzeugt!')
  }



}
