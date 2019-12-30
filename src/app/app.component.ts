import { Component } from '@angular/core';
import { CalendarService } from './services/calendar.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'event-mesh';

  constructor(private calendarService: CalendarService) { }

  ngOnInit() { }

}
