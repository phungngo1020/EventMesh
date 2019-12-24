import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  events = [];

  addEvent(newEventLabel, startTime) {
    var newEvent = {
      label: newEventLabel,
      start: startTime
    };
    this.events.push(newEvent);
  }

  constructor() { }

  ngOnInit() {
  }

}
