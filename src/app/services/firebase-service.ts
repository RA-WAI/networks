import { inject, Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { Register } from '../interfaces/register';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  
  firestore = inject(Firestore);
  registrationCollection = collection(this.firestore, 'networks');
  // regsterationDoc = doc(this.firestore, 'networks', );

  async deleteRecord(id: string) {
    try {
      const docRef = doc(this.firestore, 'networks', id);
      await deleteDoc(docRef);
      // console.log(`Document ${id} deleted successfully`);
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  }
  
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
