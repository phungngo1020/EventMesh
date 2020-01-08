import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/services/data-storage.service';

@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.css']
})
export class MonthComponent implements OnInit {

  constructor(private dataStorageService: DataStorageService) { }

  ngOnInit() {
  }
}
