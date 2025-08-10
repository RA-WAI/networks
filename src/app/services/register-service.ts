import { inject, Injectable } from '@angular/core';
import { FirebaseService } from './firebase-service';
import { PageLoaderService } from './page-loader-service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private loader: PageLoaderService) {}
  
  firebase = inject(FirebaseService);
  
  async getRecords(date = null){
    
    this.firebase.getRegistration().subscribe({
      next: value => {
        return value;
      },
      error: error => {
        console.log(error);
      },
      complete: () => {
        console.log('Records fetched successfully');
      }
    });
    
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
