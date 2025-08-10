import { Component } from '@angular/core';
import { PageLoaderService } from '../../../services/page-loader-service';
import { takeWhile } from 'rxjs';

@Component({
  selector: 'app-loader',
  imports: [],
  templateUrl: './loader.html',
  styleUrl: './loader.css'
})
export class Loader {
  constructor(private pageLoader:PageLoaderService) {}
  
  loading: boolean = false;
  message: string = '';
  progressValue: number = 0;
  progressValueStyle: string = '';
  private _subscribed: boolean = true;
  
  ngOnInit(): void {
    this.subscribe();
  }
  private subscribe() {
    this.pageLoader.state
    .pipe(takeWhile(() => this._subscribed))
    .subscribe(loading => {
      this.loading = loading;
    });
    this.pageLoader.message
    .pipe(takeWhile(() => this._subscribed))
    .subscribe(message => {
      if (!!message) {
        this.message = message;
      }
    });
    this.pageLoader.progressValue
    .pipe(takeWhile(() => this._subscribed))
    .subscribe(progressValue => {
      if (!!progressValue) {
        this.progressValue = progressValue;
        this.progressValueStyle = `${progressValue}%`;
      }
    });
  }
  ngOnDestroy() {
    this._subscribed = false;
  }
}
