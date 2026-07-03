import { Component, inject } from '@angular/core';
import {increment, decrement, reset} from './state/counter.actions';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';

export interface AppState {
  count: number;
}
@Component({
  selector: 'app-counter',
  imports: [CommonModule],
  templateUrl: './counter.html',
  styleUrl: './counter.css',
})
export class CounterComponent {

  // Uses Angular's functional injection to pull the global NgRx Store instance
  // into this component. <AppState> guarantees that TypeScript knows exactly what 
  // data properties exist inside it.
  
private store=inject(Store<AppState>);

  count$=this.store.select('count');

  constructor(){}

  onIncrement(){
    this.store.dispatch(increment());
  }
  
  onDecrement(){
    this.store.dispatch(decrement());
  }

  onReset(){
    this.store.dispatch(reset());
  }
}
