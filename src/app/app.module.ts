import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { FlightSearchComponent } from './flight-booking/flight-search/flight-search.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FlightService } from './flight-booking/flight.service';
import { FlightBookingModule } from './flight-booking/flight-booking.module';
import { BASE_URL } from './app.tokens';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    FlightBookingModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    {provide: BASE_URL, useValue: 'http://www.angular.at/api'}
    // { provide: FlightService, useClass: FlightService }
    // FlightService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
