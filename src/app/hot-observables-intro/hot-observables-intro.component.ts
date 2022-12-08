import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent, Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-hot-observables-intro',
  templateUrl: './hot-observables-intro.component.html',
  styleUrls: ['./hot-observables-intro.component.css']
})
export class HotObservablesIntroComponent implements OnInit {
  @ViewChild('mybutton') button!: ElementRef;
  n1: number = 0;
  n2: number = 0;
  s1: string = '';
  s2: string = '';

  constructor() { }

  
  ngOnInit() {

    class Producer {
      private mylisteners = [];
      private n = 0;
      private id;
    
      
      addListener(l) {
        console.log(this.mylisteners.length);
        this.mylisteners.push(l);
      }

      start() {
        this.id = setInterval(() => {
          this.n++;
          console.log('From Producer: ' + this.n);
          for (let l of this.mylisteners)
              l(this.n);
        },1000);
      }

      stop() {
        clearInterval(this.id);
      }

    }

    let  producer:  Producer = new Producer();
    producer.start();
    setTimeout(
      ()=> {
        producer.addListener((n) => console.log('from listener 1', n));
        producer.addListener((n) => console.log('from listener 2', n));
      }, 4000);
  
    const myHotObservable = new Observable(
      (observer: Observer<number>) => {
        producer.addListener( (n) => observer.next(n));
      }
    );

    myHotObservable.subscribe((n) => console.log('from Subscriber 1', n));
    myHotObservable.subscribe((n) => console.log('from Subscriber 2', n));

  }

  ngAfterViewInit() {
    let myBtnClickObservable: Observable<any> = fromEvent(
      this.button.nativeElement, 'click');
      myBtnClickObservable.subscribe( (event) => console.log('button clicked 1'));
      myBtnClickObservable.subscribe( (event) => console.log('button clicked 2'));

  }

}
