import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventsComponent } from './events/events.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MonthComponent } from './month/month.component';
import { TasksComponent } from './tasks/tasks.component';
import { WeekComponent } from './week/week.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'month', component: MonthComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    EventsComponent,
    HomeComponent,
    LoginComponent,
    MonthComponent,
    TasksComponent,
    WeekComponent
  ],
  imports: [
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule,
    BrowserModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
