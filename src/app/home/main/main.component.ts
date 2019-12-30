import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../tasks/task.model';
import { Event } from '../tasks/event.model';
import { TasksService } from '../tasks/tasks.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
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
    this.tasksService.fetchEvents().subscribe(events => {
      this.isFetching = false;
      this.loadedEvents = events;
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
  today: number = Date.now();
  weekday = (new Date()).getDay();

  
  onCreateEvent(eventTitle) {
    console.log("clicked");
    console.log(eventTitle);
    this.tasksService.createAndStoreEvent(eventTitle).subscribe(responseData => {
      console.log(responseData);
      this.tasksService.fetchEvents().subscribe(events => {
        this.isFetching = false;
        this.loadedEvents = events;
        console.log(events);
      });
    });
  }
  onFetchEvents() {
    this.isFetching = true;
    this.tasksService.fetchEvents().subscribe(events => {
      this.isFetching = false;
      this.loadedEvents = events;
    }, error => {
      this.error = error.message;
    });
  }
  onClearEvents(event: Event) {
    // Send Http request
    console.log("deleting "+ event.id);
    this.tasksService.deleteEvent(event.id).subscribe(() => {
      this.onFetchEvents();
    }); 
  }

}
