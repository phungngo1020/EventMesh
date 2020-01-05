import { Injectable } from '@angular/core';

// Service for handling calendar activities
@Injectable({ providedIn: 'root' })
export class CalendarService {

  // today's date
  private todayDate: number = Date.now();

  // constructor
  constructor() { }

  // function to get today's date
  getTodayDate(): number {
    return this.todayDate;
  }

  // function to get a week of dates
  getCurrentWeek(mondayDate: Date): Date[] {
    return [];
  }

}
