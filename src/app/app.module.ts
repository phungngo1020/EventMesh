import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { OptionsComponent } from './options/options.component';
import { WeatherComponent } from './weather/weather.component';
import { DateComponent } from './date/date.component';
import { EventsComponent } from './events/events.component';
import { TasksComponent } from './tasks/tasks.component';
import { WeekComponent } from './week/week.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    OptionsComponent,
    WeatherComponent,
    DateComponent,
    EventsComponent,
    TasksComponent,
    WeekComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
