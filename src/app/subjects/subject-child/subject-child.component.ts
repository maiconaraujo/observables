import { Component, Input, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { DataModel } from 'src/app/datamodel';

@Component({
  selector: 'app-subject-child',
  templateUrl: './subject-child.component.html',
  styleUrls: ['./subject-child.component.css']
})
export class SubjectChildComponent implements OnInit {

  @Input() subject: Subject<DataModel>;
  @Input() name: string;

  public log: string[] = [];
  public connected: boolean = false;
  public subscrition: Subscription;

  constructor() { }

  ngOnInit(): void {
  }

  logData(data: DataModel) {
    this.log.push("Timestamp: " + data.timestamp + "Data: " + data.data);
  }

  connect() {
    this.log.push("Connected!");
    this.connected = true;
    this.subscrition =  this.subject.subscribe(
      (data: DataModel) => { this.logData(data);},
      (error) => { this.connected = false; },
      () => { this.connected = false; this.log.push("Finished")}
    );
  }

  disconnect() {

  }

}
