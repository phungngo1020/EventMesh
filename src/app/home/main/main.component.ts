import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../../shared/task.model';
import { Event } from '../../shared/event.model';
import { DataStorageService } from '../../shared/data-storage.service';
import { AuthService } from '../../login/auth.service';

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

  constructor(
    private http: HttpClient, 
    private dataStorageService: DataStorageService,
    private authService: AuthService) { }


  ngOnInit() {
    this.isFetching = true;
    this.onFetchMode();
    this.dataStorageService.fetchTasks().subscribe(tasks => {
      this.isFetching = false;
      this.loadedTasks = tasks;
    }, error => {
      this.error = error.message;
    });
    this.dataStorageService.fetchEvents().subscribe(events => {
      this.isFetching = false;
      this.loadedEvents = events;
    }, error => {
      this.error = error.message;
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
  today: number = Date.now();
  weekday = (new Date()).getDay();

  
  onCreateEvent(eventTitle) {
    console.log("clicked");
    console.log(eventTitle);
    if(this.authService.signedin===true) {
      this.dataStorageService.createAndStoreEvent(eventTitle).subscribe(responseData => {
        console.log(responseData);
        this.dataStorageService.fetchEvents().subscribe(events => {
          this.isFetching = false;
          this.loadedEvents = events;
          console.log(events);
        });
      });
    } else if (this.authService.signedin === false) {
      this.loadedEvents.push(eventTitle);
    }
    
  }
  onFetchEvents() {
    this.isFetching = true;
    this.dataStorageService.fetchEvents().subscribe(events => {
      this.isFetching = false;
      this.loadedEvents = events;
    }, error => {
      this.error = error.message;
    });
  }
  onClearEvents(event: Event) {
    // Send Http request
    console.log("deleting "+ event.id);
    this.dataStorageService.deleteEvent(event.id).subscribe(() => {
      this.onFetchEvents();
    }); 
  }


  currentMode: string = 'dark';
  onFetchMode() {
    if(this.authService.signedin === true) {
      this.dataStorageService.fetchMode().subscribe(resMode => {
        this.currentMode = resMode[0].mode;
        console.log(this.currentMode);
      }, error => {
        this.error = error.message;
      });
    }
  }
}
