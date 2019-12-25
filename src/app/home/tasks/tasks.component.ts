import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

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
  }

  constructor() { }

  ngOnInit() {
  }

}
