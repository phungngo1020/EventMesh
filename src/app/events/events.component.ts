import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Event } from '../models/event.model';
import { EventsService } from './events.service';
import { AuthService } from '../services/auth.service'
import { DataStorageService } from '../services/data-storage.service';


@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  loadedEvents: Event[] = [];
  isFetching = false;
  error = null;

  constructor(private http: HttpClient,
      private dataStorageService: DataStorageService,
      private authService: AuthService,
      private eventsService: EventsService) { }

  ngOnInit() {
    this.isFetching = true;
    this.eventsService.fetchEvents().subscribe(events => {
      this.isFetching = false;
      this.loadedEvents = events;
    });
  }

  onCreateEvent(eventTitle) {
    console.log("clicked");
    console.log(eventTitle);
    if(this.authService.signedin===true) {
      this.dataStorageService.createAndStoreEvent(eventTitle).subscribe(responseData => {
        console.log(responseData);
        this.dataStorageService.fetchEvents().subscribe(events => {
          this.isFetching = false;
          this.loadedEvents = events;
          console.log(events);
        });
      });
    } else if (this.authService.signedin === false) {
      this.loadedEvents.push(eventTitle);
    }
  }
  onFetchEvents() {
    this.isFetching = true;
    this.dataStorageService.fetchEvents().subscribe(events => {
      this.isFetching = false;
      this.loadedEvents = events;
    }, error => {
      this.error = error.message;
    });
  }

  onClearEvents(event: Event) {
    // Send Http request
    console.log("deleting "+ event.id);
    this.dataStorageService.deleteEvent(event.id).subscribe(() => {
      this.onFetchEvents();
    });
  }

}
