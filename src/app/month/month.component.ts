import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.css']
})
export class MonthComponent implements OnInit {

  constructor(private dataStorageService: DataStorageService) { }

  ngOnInit() {
    this.onFetchMode();
  }

  currentMode = 'light';

  onFetchMode() {
    this.dataStorageService.fetchMode().subscribe(resMode => {
      this.currentMode = resMode[0].mode;
      console.log(this.currentMode);
    });
    
  }
}
