import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { getAuth, provideAuth } from "@angular/fire/auth";
import { environment } from "../environments/environment";
import { FIREBASE_OPTIONS } from "@angular/fire/compat";

export const firebaseProviders = [

    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    { provide: FIREBASE_OPTIONS, useValue: environment.production }
];
