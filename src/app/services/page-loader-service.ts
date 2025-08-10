import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageLoaderService {
  
  constructor() { }
  
  private loading$: Subject<boolean> = new BehaviorSubject(false);
  private message$: Subject<string> = new BehaviorSubject('');
  private progressValue$: Subject<number> = new BehaviorSubject(0);
  
  showLoader(message: string = '', progressValue: number = 0) {
    this.loading$.next(true);
    this.message$.next(message);
    this.progressValue$.next(progressValue);
    console.log('loader is starting');
  }
  
  
  hideLoader() {
    this.loading$.next(false);
    this.message$.next('');
    this.progressValue$.next(0);
  }
  
  get state() {
    return this.loading$.asObservable();
  }
  
  get message(): Observable<string> {
    return this.message$.asObservable();
  }

  get progressValue(): Observable<number> {
    return this.progressValue$.asObservable();
  }
  
  set message(msg: string) {
    this.message$.next(msg);
  }
  
  setProgressValue(value: number) {
    this.progressValue$.next(value);
  }
  
}
