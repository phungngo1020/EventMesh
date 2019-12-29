import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Task } from './task.model'

@Injectable({providedIn: 'root'})
export class TasksService {

    constructor(private http: HttpClient) {}

    createAndStoreTask(title: string, completed: boolean) {

        const taskData: Task = {title: title, completed: completed};
        
        return this.http
            .post<{ name: string }>(
              'https://eventmesh-1a5be.firebaseio.com/tasks.json',
              taskData
            );
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
}
