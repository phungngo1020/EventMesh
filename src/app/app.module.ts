import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './home/user/user.component';
import { OptionsComponent } from './home/options/options.component';
import { WeatherComponent } from './home/weather/weather.component';
import { DateComponent } from './home/date/date.component';
import { EventsComponent } from './home/events/events.component';
import { TasksComponent } from './home/tasks/tasks.component';
import { WeekComponent } from './home/week/week.component';
import { HomeComponent } from './home/home.component';
import { MonthComponent } from './month/month.component';
import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'month', component: MonthComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    OptionsComponent,
    WeatherComponent,
    DateComponent,
    EventsComponent,
    TasksComponent,
    WeekComponent,
    HomeComponent,
    MonthComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
