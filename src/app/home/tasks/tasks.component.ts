import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Task } from './task.model';
import { componentFactoryName } from '@angular/compiler';
import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  loadedTasks: Task[] = [];
  loadedEvents: Event[] = [];
  isFetching = false;
  error = null;

  constructor(private http: HttpClient, private tasksService: TasksService) { }

  ngOnInit() {
    this.isFetching = true;
    this.tasksService.fetchTasks().subscribe(tasks => {
      this.isFetching = false;
      this.loadedTasks = tasks;
    }, error => {
      this.error = error.message;
    });
  }

  onCreateTask(taskData: Task) {
    this.tasksService.createAndStoreTask(taskData.title, false).subscribe(responseData => {
      console.log(responseData);
      this.tasksService.fetchTasks().subscribe(tasks => {
        this.isFetching = false;
        this.loadedTasks = tasks;
      });
    });
  }


  onFetchTasks() {
    this.isFetching = true;
    this.tasksService.fetchTasks().subscribe(tasks => {
      this.isFetching = false;
      this.loadedTasks = tasks;
    }, error => {
      this.error = error.message;
    });
  }

  onClearTasks(task: Task) {
    // Send Http request
    console.log("deleting "+ task.id);
    this.tasksService.deleteTask(task.id).subscribe(() => {
      this.onFetchTasks();
    }); 
  }

}
