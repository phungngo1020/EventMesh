import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, take, exhaustMap } from 'rxjs/operators';
import { Task } from './task.model';
import { Event } from './event.model';
import { City } from './city.model';
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

    username: string;
    createAndStoreTask(title: string, completed: boolean) {
        const taskData: Task = {title: title, completed: completed};
        this.added = true;
        return this.authService.user.pipe(take(1), exhaustMap(user => {
            this.username = user.email.substring(0, user.email.lastIndexOf("@"));
            return this.http
            .post<{ name: string }>(
                'https://eventmesh-1a5be.firebaseio.com/'+ this.username + '/tasks' +'.json?', taskData, {
                params: new HttpParams().set('auth', user.token)
            }
            );
        })
        );
    }

    fetchTasks() {
        return this.authService.user.pipe(
            take(1), 
            exhaustMap(user => {
                this.username = user.email.substring(0, user.email.lastIndexOf("@"));

                return this.http.get<{ [key: string]: Task }>(
                    'https://eventmesh-1a5be.firebaseio.com/'+ this.username + '/tasks' +'.json?', 
                {
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
            this.username = user.email.substring(0, user.email.lastIndexOf("@"));

            return this.http
            .delete(
            'https://eventmesh-1a5be.firebaseio.com/'+ this.username + '/tasks/' + id + '.json?', {
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
            this.username = user.email.substring(0, user.email.lastIndexOf("@"));
            return this.http
            .post<{ name: string }>(
                'https://eventmesh-1a5be.firebaseio.com/'+ this.username + '/events' +'.json?', title, {
                params: new HttpParams().set('auth', user.token)
            }
            );
        })
        );
    }
    fetchEvents() {
        return this.authService.user.pipe(take(1), exhaustMap(user => {
            this.username = user.email.substring(0, user.email.lastIndexOf("@"));
            return this.http
            .get<{ [key: string]: Event}>(
                'https://eventmesh-1a5be.firebaseio.com/'+ this.username + '/events' +'.json?', {
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
            this.username = user.email.substring(0, user.email.lastIndexOf("@"));
            return this.http
            .delete(
            'https://eventmesh-1a5be.firebaseio.com/'+ this.username + '/events/' + id + '.json?', {
                params: new HttpParams().set('auth', user.token)
            }
            );
        })
        );
    }




    /*
   createAndStoreCity(title) {
        this.added = true;
        return this.authService.user.pipe(take(1), exhaustMap(user => {
            this.username = user.email.substring(0, user.email.lastIndexOf("@"));
            return this.http
            .post<{ name: string }>(
                'https://eventmesh-1a5be.firebaseio.com/'+ this.username + '/city' +'.json?', title, {
                params: new HttpParams().set('auth', user.token)
            }
            );
        })
        );
    }
    fetchCity() {
        return this.authService.user.pipe(take(1), exhaustMap(user => {
            this.username = user.email.substring(0, user.email.lastIndexOf("@"));
            return this.http
            .get<{ [key: string]: City}>(
                'https://eventmesh-1a5be.firebaseio.com/'+ this.username + '/city' +'.json?', {
                params: new HttpParams().set('auth', user.token)
            }
            );
        }),
            map(responseData => {
                const cityArray: City[] = [];
                    for (const key in responseData) {
                        if (responseData.hasOwnProperty(key)) {
                            cityArray.push({ ...responseData[key], id: key });
                        }
                    }
                return cityArray; 
            })
        );
    }
    */



}
