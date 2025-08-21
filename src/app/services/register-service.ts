import { inject, Injectable } from '@angular/core';
import { FirebaseService } from './firebase-service';
import { PageLoaderService } from './page-loader-service';
import { Observable } from 'rxjs';
import { Register } from '../interfaces/register';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private loader: PageLoaderService) {}
  
  firebase = inject(FirebaseService);
  
  getRecords(date: string | null = null): Observable<Register[]> {
    // you can filter by `date` here if needed
    return this.firebase.getRegistration();
    
  }

  async addRecord(data: object) {

    // this.loader.showLoader('Submitting registration form...', 50);
    this.loader.showLoader('Please wait, your form is being submitted.', 50);
    return this.firebase.addRegistration(data).toPromise().then(
      (response) => {
        console.log('Record added successfully:', response);
        this.loader.hideLoader();
        return response;
      },
      (error) => {
        console.error('Error adding record:', error);
        this.loader.hideLoader();
        throw error;
      }
    );
  }


  
}
