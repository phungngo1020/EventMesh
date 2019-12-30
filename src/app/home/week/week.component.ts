import { Component, OnInit, Output } from '@angular/core';
import { Task } from '../tasks/task.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { EventEmitter } from 'events';

import { TasksService } from '../tasks/tasks.service';

@Component({
  selector: 'app-week',
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.css']
})
export class WeekComponent implements OnInit {

  @Output() fetchTask = new EventEmitter();


  today: number = Date.now();
  weekday = (new Date()).getDay();

  loadedTasks: Task[] = [];
  isFetching = false;


  constructor(private http: HttpClient, private tasksService: TasksService) { }

  ngOnInit() {
    this.tasksService.fetchTasks().subscribe(tasks => {
      this.isFetching = false;
      this.loadedTasks = tasks;
    });
  }

  onFetchTasks() {
    // Send Http request
    
    this.tasksService.fetchTasks().subscribe(tasks => {
      this.isFetching = false;
      this.loadedTasks = tasks;      
    });
  }

}
