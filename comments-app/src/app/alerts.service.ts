import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {
  alerts: string[] = [];

  add(alert: string) {
    this.alerts.push(alert)
  }

  remove() {
    this.alerts = [];
  }


  constructor() { }
}
