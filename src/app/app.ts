import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { Loader } from "./pages/common/loader/loader";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    AngularFireAuthModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    Loader
],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'Networks';
}
