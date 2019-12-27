import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Task } from './task.model';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  loadedTasks: Task[] = [];
  isFetching = false;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fetchTasks();
  }

  onCreateTask(taskData: Task) {
    taskData = {
      title: taskData.title,
      completed: false
    } 
    this.http
      .post<{ name: string }>(
        'https://eventmesh-1a5be.firebaseio.com/tasks.json',
        taskData
      )
      .subscribe(responseData => {
        console.log(responseData);
      });
  }


  onFetchTasks() {
    // Send Http request
    this.fetchTasks();
  }

  onClearTasks() {
    // Send Http request
  }

  private fetchTasks() {
    this.isFetching = true;
    this.http
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
      .subscribe(tasks => {
        this.isFetching = false;
        this.loadedTasks = tasks;
      });
  }




    /*
  tasks = [];

  addTask(newTaskLabel) {
    var newTask = {
      label: newTaskLabel,
      complete: false
    };
    this.tasks.push(newTask);
  }

  completeTask(task) {
    task.complete = !task.complete;
  }

  deleteTask(task) {
    this.tasks = this.tasks.filter(t => t.label !== task.label);
  } */
}
