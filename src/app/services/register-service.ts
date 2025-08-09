import { inject, Injectable } from '@angular/core';
import { FirebaseService } from './firebase-service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  
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
    return this.firebase.addRegistration(data).toPromise().then(
      (response) => {
        console.log('Record added successfully:', response);
        return response;
      },
      (error) => {
        console.error('Error adding record:', error);
        throw error;
      }
    );
  }


  
}
