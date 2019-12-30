import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Task } from '../models/task.model';
import { componentFactoryName } from '@angular/compiler';
import { TasksService } from './tasks.service';
import { CalendarService } from '../services/calendar.service'

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css','../app.component.css']
})
export class TasksComponent implements OnInit {
  loadedTasks: Task[] = [];
  isFetching = false;

  constructor(private http: HttpClient,
    private tasksService: TasksService,
    private calendarService: CalendarService) { }

  ngOnInit() {
    this.isFetching = true;
    this.tasksService.fetchTasks().subscribe(tasks => {
      this.isFetching = false;
      this.loadedTasks = tasks;
    });
  }

  onCreateTask(taskData: Task) {
    this.tasksService.createAndStoreTask(taskData.title, this.calendarService.getTodayDate()+"")
    .subscribe(responseData => {
      console.log(responseData);
      this.tasksService.fetchTasks().subscribe(tasks => {
        this.isFetching = false;
        this.loadedTasks = tasks;
      });
    });
  }

  onClearTasks() {
    // Send Http request
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
