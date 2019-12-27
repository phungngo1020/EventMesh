import { Component, OnInit, Output } from '@angular/core';
import { Task } from '../tasks/task.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-week',
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.css']
})
export class WeekComponent implements OnInit {

  @Output() fetchTask = new EventEmitter();


  today: number = Date.now();
  weekday = (new Date()).getDay();

  checkDate(weekday) {
    
  }

  loadedTasks: Task[] = [];
  isFetching = false;


  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fetchTasks();
  }

  onFetchTasks() {
    // Send Http request
    this.fetchTasks();
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

}
