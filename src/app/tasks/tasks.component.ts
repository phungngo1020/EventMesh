import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Task } from '../models/task.model';
import { componentFactoryName } from '@angular/compiler';
import { TasksService } from './tasks.service';
import { CalendarService } from '../services/calendar.service'
import { AuthService } from '../services/auth.service'
import { DataStorageService } from '../services/data-storage.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css','../app.component.css']
})
export class TasksComponent implements OnInit {
  loadedTasks: Task[] = [];
  isFetching = false;
  error = null;

  constructor(private http: HttpClient,
    private tasksService: TasksService,
    private dataStorageService: DataStorageService,
    private authService: AuthService,
    private calendarService: CalendarService) { }

  ngOnInit() {
    this.isFetching = true;
    this.tasksService.fetchTasks().subscribe(tasks => {
      this.isFetching = false;
      this.loadedTasks = tasks;
    });
  }

  onCreateTask(taskData: Task) {
    console.log(this.authService.signedin);
    if(this.authService.signedin === true) {
      this.dataStorageService.createAndStoreTask(taskData.title, false).subscribe(responseData => {
        console.log(responseData);
        this.dataStorageService.fetchTasks().subscribe(tasks => {
          this.isFetching = false;
          this.loadedTasks = tasks;
        });
      });
    } else if (this.authService.signedin === false) {
      this.loadedTasks.push(taskData);
    }
  }

  onFetchTasks() {
    this.isFetching = true;
    this.dataStorageService.fetchTasks().subscribe(tasks => {
      this.isFetching = false;
      this.loadedTasks = tasks;
    }, error => {
      this.error = error.message;
    });
  }

  onClearTasks(task: Task) {
    // Send Http request
    console.log("deleting "+ task.id);
    this.dataStorageService.deleteTask(task.id).subscribe(() => {
      this.onFetchTasks();
    });
  }

}
