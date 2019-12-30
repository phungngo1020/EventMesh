import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Event } from '../models/event.model'

@Injectable({providedIn: 'root'})
export class EventsService {

    constructor(private http: HttpClient) {}

    createAndStoreEvent(title: string, start: string, end: string) {
        const eventData: Event = {title: title, startDate: start, endDate: end};
        this.http
            .post<{ name: string }> (
                'https://eventmesh-1a5be.firebaseio.com/events.json',
                eventData
            )
            .subscribe(responseData => {
                console.log(responseData);
            });
    }

    fetchEvents() {
        return this.http
            .get<{ [key: string]: Event}> (
                'https://eventmesh-1a5be.firebaseio.com/events.json'
            )
            .pipe(
                map(responseData => {
                    const eventsArray: Event[] = [];
                    for (const key in responseData) {
                        if (responseData.hasOwnProperty(key)) {
                            eventsArray.push({...responseData[key], id: key});
                        }
                    }
                    return eventsArray;
                })
            )
    }
}
