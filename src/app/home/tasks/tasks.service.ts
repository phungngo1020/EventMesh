import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Task } from './task.model';

import { Event } from './event.model';

@Injectable({providedIn: 'root'})
export class TasksService {
    added = false;

    constructor(private http: HttpClient) {}

    createAndStoreTask(title: string, completed: boolean) {
        
        const taskData: Task = {title: title, completed: completed};
        this.added = true;
        
        return this.http
            .post<{ name: string }>(
              'https://eventmesh-1a5be.firebaseio.com/tasks.json',
              taskData
            )
    }

    fetchTasks() {
        return this.http
            .get<{ [key: string]: Task }>(
            'https://eventmesh-1a5be.firebaseio.com/tasks.json'
            )
            .pipe(
                map(responseData => {
                    const tasksArray: Task[] = [];
                    for (const key in responseData) {
                        if (responseData.hasOwnProperty(key)) {
                            tasksArray.push({ ...responseData[key], id: key });
                        }
                    }
                    return tasksArray;
                })
            )
    }
    deleteTask(id: string) {
        return this.http.delete('https://eventmesh-1a5be.firebaseio.com/tasks/' + id + '.json');
    }

    /****** EVENTS ******/
    createAndStoreEvent(title) {
        this.added = true;
        return this.http
            .post<{ name: string }>(
              'https://eventmesh-1a5be.firebaseio.com/events.json',
              title
            )
    }
    fetchEvents() {
        return this.http
            .get<{ [key: string]: Event}>(
            'https://eventmesh-1a5be.firebaseio.com/events.json'
            )
            .pipe(
                map(responseData => {
                    const eventsArray: Event[] = [];
                    for (const key in responseData) {
                        if (responseData.hasOwnProperty(key)) {
                            eventsArray.push({ ...responseData[key], id: key });
                        }
                    }
                    return eventsArray;
                })
            )
    }
    deleteEvent(id: string) {
        return this.http.delete('https://eventmesh-1a5be.firebaseio.com/events/' + id + '.json');
    }

}