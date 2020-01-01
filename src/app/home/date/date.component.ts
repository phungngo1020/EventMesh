import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../../shared/data-storage.service';
@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css']
})
export class DateComponent implements OnInit {

  today: number = Date.now();
  error = null;

  constructor(private dataStorageService: DataStorageService) { }

  ngOnInit() {
    this.onFetchMode();
  }

  currentMode: string = 'dark';
  onFetchMode() {
    this.dataStorageService.fetchMode().subscribe(resMode => {
      this.currentMode = resMode[0].mode;
      console.log(this.currentMode);
    }, error => {
      this.error = error.message;
    });
  }
}
