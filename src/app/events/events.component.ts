import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Event } from '../models/event.model';
import { EventsService } from './events.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  loadedEvents: Event[] = [];
  isFetching = false;

  constructor(private https: HttpClient, private eventsService: EventsService) { }

  ngOnInit() {
    this.isFetching = true;
    this.eventsService.fetchEvents().subscribe(events => {
      this.isFetching = false;
      this.loadedEvents = events;
    });
  }

  onCreateEvent(eventData: Event) {
    this.eventsService.createAndStoreEvent(eventData.title,
      eventData.startDate,
      eventData.endDate);
  }

  onFetchEvent() {
    this.eventsService.fetchEvents();
  }

  onClearEvents() {

  }




  /*
  events = [];

  addEvent(newEventLabel, startTime) {
    var newEvent = {
      label: newEventLabel,
      start: startTime
    };
    this.events.push(newEvent);
  }

  deleteEvent(event) {
    this.events = this.events.filter(t => t.label !== event.label);
  }
  */
}
