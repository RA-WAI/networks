import { inject, Injectable } from '@angular/core';
import { addDoc, collection, collectionData, Firestore } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { Register } from '../interfaces/register';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  
  firestore = inject(Firestore);
  registrationCollection = collection(this.firestore, 'networks');
  
  getRegistration() : Observable<Register[]> {
    return collectionData(this.registrationCollection, { 
      idField: 'id',
    }) as Observable<Register[]>;
  }
  
  
  
  addRegistration(data:object): Observable<string> { 
    
    const promise = addDoc(this.registrationCollection, data).then(
      (response) => {
        return response.id;
      }
    );
    
    return from(promise);
  }
  
  getRegister(): Observable<Register[]> {
    return this.getRegistration();
  }
  
}
