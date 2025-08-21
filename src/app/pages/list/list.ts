import { Component } from '@angular/core';
import { Route, RouterModule, Router } from '@angular/router';
import { RegisterService } from '../../services/register-service';
import { firstValueFrom, Observable, take } from 'rxjs';
import { Register } from '../../interfaces/register';
import { PageLoaderService } from '../../services/page-loader-service';
import { after } from 'node:test';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  imports: [RouterModule],
  templateUrl: './list.html',
  styleUrl: './list.css'
})
export class List {
  
  constructor(
    private registerService: RegisterService,
    private router: Router
  ) { 
      
    }
    
    
    records: Register[] = [];
    newRecords: Register[] = [];
    
    ngOnInit(): void {
      this.getRegisterdUsers();
    }
    
    getRegisterdUsers(): void {
      this.loadRecords().then((data) => {
        this.records = data;
      }).catch((err) => {
        console.error('Error loading records:', err);
      });
    } 
    
    async loadRecords(): Promise<Register[]> {
      try {
        const allRecords: Register[] = await this.registerService.getRecords();
        return allRecords;
      } catch (err) {
        console.error(err);
        return [];
      }
    }
    
    async deleteRecord(id: number): Promise<void> {
      try {
        await this.registerService.deleteRecord(String(id));
        this.records = this.records.filter(record => record.id !== Number(id));
        this.showAlert('success', 'Your registration was successful. Let’s get started soon.');
        
      } catch (err) {
        console.error('Error deleting record:', err);
      }
    }
    
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
      }).then((result) => {
        if (result.isConfirmed) {
          // Call your method here
          this.registerService.toogleLoader(false);
          this.getRegisterdUsers(); // Refresh the list after deletion
        }
      });
    }
    
  }
  