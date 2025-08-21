import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { lettersOnlyValidator } from './letter-only.validator';
import { RegisterService } from '../../services/register-service';


@Component({
  selector: 'app-register',
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register implements OnInit {

  loading: boolean = false;
  form: FormGroup;
  
  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private registerService: RegisterService,
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4), lettersOnlyValidator()]],
      email: ['', [Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(9)]],
      gender: ['', [Validators.required]],
      date: ['']
    });
  }
  
  ngOnInit(): void {
    
  }
  
  onSubmit() {
    
    if (this.form.valid) {
      
      this.form.value.date = new Date().toISOString().split('T')[0]; // Set current date in YYYY-MM-DD format 
      
      this.registerService.addRecord(this.form.value).then(
        (response) => {
          
          this.router.navigate(['/about']);
          this.showAlert('success', 'Your registration was successful. Let’s get started soon.');
          
          // console.log('Record added successfully:', response);
          
        })
        .catch((error) => {
          // console.error('Error adding record:', error) ;
          this.showAlert('error', 'Your registration was not successful. Please try again.');
        });
        
        
        // this.showAlert('success', 'Your registration was successful. Let’s get started soon.');
      } else {
        this.form.markAllAsTouched();
        return;
      }
    }
    
    
    get name() { return this.form.get('name')!; }
    get phone() { return this.form.get('phone')!; }
    get email() { return this.form.get('email')!; }
    get gender() { return this.form.get('gender')!; }
    
    showAlert(icon:any, message:string) {
      
      let title = '';
      switch(message) {
        case 'success':
        title = 'Success!';
        break;
        case 'error':
        title = 'Error!';
        break;
        case 'warning':
        title = 'Warning!'; 
        break;
      };
      
      Swal.fire({
        title: message == title,
        text: message,
        icon: icon,
        confirmButtonText: 'OK'
      });
    }
    
  }
  