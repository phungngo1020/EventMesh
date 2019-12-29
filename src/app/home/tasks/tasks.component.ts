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
  isFetching = false;

  constructor(private http: HttpClient, private tasksService: TasksService) { }

  ngOnInit() {
    this.isFetching = true;
    this.tasksService.fetchTasks().subscribe(tasks => {
      this.isFetching = false;
      this.loadedTasks = tasks;
    });
  }

  onCreateTask(taskData: Task) {
    this.tasksService.createAndStoreTask(taskData.title, false);
  }


  onFetchTasks() {
    // Send Http request
    this.tasksService.fetchTasks();
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
