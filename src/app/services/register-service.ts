import { inject, Injectable } from '@angular/core';
import { FirebaseService } from './firebase-service';
import { PageLoaderService } from './page-loader-service';
import { firstValueFrom, Observable } from 'rxjs';
import { Register } from '../interfaces/register';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  
  constructor(private loader: PageLoaderService) {}
  
  firebase = inject(FirebaseService);
  
  async getRecords(): Promise<Register[]> {
    
    try {
      const registeredUser = await firstValueFrom(this.firebase.getRegister());
      const sorted = registeredUser.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      
      return sorted;
    } catch (error) {
      
      return [];
    }
    
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
