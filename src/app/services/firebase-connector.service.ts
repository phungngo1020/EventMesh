import { Injectable } from '@angular/core';
import { Event } from '../models/event.model'
import { Task } from '../models/task.model'

// service for handling firebase connection
@Injectable({ providedIn: 'root' })
export class FirebaseConnectorService {

  // list of events
  private eventList = [];
  // list of tasks
  private taskList = [];

  // constructor
  constructor() { }

  // function to update event list retrieved from firebase
  updateEventList(): void { }

  // function to update task list retrieved from firebase
  updateTaskList(): void { }

  // function to get event to firebase
  getEventList(): Event[] {
    return this.eventList;
  }

  // function to get task to firebase
  getTaskList(): Task[] {
    return this.taskList;
  }

  // function to add task to firebase
  addTask(task: Task): void { }

  // function to add event to firebase
  addEvent(event: Event): void { }

}
