import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, take, exhaustMap } from 'rxjs/operators';
import { Task } from './task.model';
import { Event } from './event.model';
import { Mode } from './mode.model';
import { AuthService } from '../login/auth.service';

@Injectable({providedIn: 'root'})
export class DataStorageService {
    added = false;

    constructor(private http: HttpClient, private authService: AuthService) {}

    /*
    createAndStoreTask(title: string, completed: boolean) {
        const taskData: Task = {title: title, completed: completed};
        this.added = true;
        return this.http
            .post<{ name: string }>(
              'https://eventmesh-1a5be.firebaseio.com/tasks.json',
              taskData
            );
    }*/

    createAndStoreTask(title: string, completed: boolean) {
        const taskData: Task = {title: title, completed: completed};
        this.added = true;
        return this.authService.user.pipe(take(1), exhaustMap(user => {
            return this.http
            .post<{ name: string }>(
                'https://eventmesh-1a5be.firebaseio.com/'+ user.id + '/tasks' +'.json?', taskData, {
                params: new HttpParams().set('auth', user.token)
            }
            );
        })
        );
    }
    createAndStoreMode(title) {
        const mode: Mode = {mode: title};
        return this.authService.user.pipe(take(1), exhaustMap(user => {
            return this.http
            .post<{ name: string }>(
                'https://eventmesh-1a5be.firebaseio.com/'+ user.id + '/mode' +'.json?', mode, {
                params: new HttpParams().set('auth', user.token)
            }
            );
        })
        );
    }
    fetchMode() {
        return this.authService.user.pipe(take(1), exhaustMap(user => {
            return this.http
            .get<{ [key: string]: Mode}>(
                'https://eventmesh-1a5be.firebaseio.com/'+ user.id + '/mode' +'.json?', {
                params: new HttpParams().set('auth', user.token)
            }
            );
        }),
            map(responseData => {
                const modeArray: Mode[] = [];
                    for (const key in responseData) {
                        if (responseData.hasOwnProperty(key)) {
                            modeArray.push({ ...responseData[key], id: key });
                        }
                    }
                    return modeArray;
            })
        );

    }
    updateMode(id: string, title: string) {
        const mode: Mode = {mode: title};
        return this.authService.user.pipe(take(1), exhaustMap(user => {
            return this.http
            .put<{ name: string }>(
                'https://eventmesh-1a5be.firebaseio.com/'+ user.id + '/mode/' + id +'.json?', mode, {
                params: new HttpParams().set('auth', user.token)
            }
            );
        })
        );
    }


    fetchTasks() {
        return this.authService.user.pipe(take(1), exhaustMap(user => {
            return this.http
            .get<{ [key: string]: Task }>(
            'https://eventmesh-1a5be.firebaseio.com/'+ user.id + '/tasks' +'.json?', {
                params: new HttpParams().set('auth', user.token)
            }
            );
        }),
            map(responseData => {
                const tasksArray: Task[] = [];
                for (const key in responseData) {
                    if (responseData.hasOwnProperty(key)) {
                        tasksArray.push({ ...responseData[key], id: key });
                    }
                }
                return tasksArray;
            })
        );
    }
    deleteTask(id: string) {
        /*
        return this.http.delete('https://eventmesh-1a5be.firebaseio.com/'+ '/tasks' +'.json?');
        */
        return this.authService.user.pipe(take(1), exhaustMap(user => {
            return this.http
            .delete(
            'https://eventmesh-1a5be.firebaseio.com/'+ user.id + '/tasks/' + id + '.json?', {
                params: new HttpParams().set('auth', user.token)
            }
            );
        })
        );
    }


    /****** EVENTS ******/

    /*
    createAndStoreEvent(title) {
        this.added = true;
        return this.http
            .put<{ name: string }>(
              'https://eventmesh-1a5be.firebaseio.com/events.json',
              title
            )
    }
    */
    createAndStoreEvent(title) {
        this.added = true;
        return this.authService.user.pipe(take(1), exhaustMap(user => {
            return this.http
            .post<{ name: string }>(
                'https://eventmesh-1a5be.firebaseio.com/'+ user.id + '/events' +'.json?', title, {
                params: new HttpParams().set('auth', user.token)
            }
            );
        })
        );
    }
    fetchEvents() {
        return this.authService.user.pipe(take(1), exhaustMap(user => {
            return this.http
            .get<{ [key: string]: Event}>(
                'https://eventmesh-1a5be.firebaseio.com/'+ user.id + '/events' +'.json?', {
                params: new HttpParams().set('auth', user.token)
            }
            );
        }),
            map(responseData => {
                const eventsArray: Event[] = [];
                    for (const key in responseData) {
                        if (responseData.hasOwnProperty(key)) {
                            eventsArray.push({ ...responseData[key], id: key });
                        }
                    }
                    return eventsArray;
            })
        );

    }

    deleteEvent(id: string) {
        return this.authService.user.pipe(take(1), exhaustMap(user => {
            return this.http
            .delete(
            'https://eventmesh-1a5be.firebaseio.com/'+ user.id + '/events/' + id + '.json?', {
                params: new HttpParams().set('auth', user.token)
            }
            );
        })
        );
    }


}
