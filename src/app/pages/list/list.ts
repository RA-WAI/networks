import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RegisterService } from '../../services/register-service';
import { firstValueFrom, Observable, take } from 'rxjs';
import { Register } from '../../interfaces/register';
import { PageLoaderService } from '../../services/page-loader-service';
import { after } from 'node:test';

@Component({
  selector: 'app-list',
  imports: [RouterModule],
  templateUrl: './list.html',
  styleUrl: './list.css'
})
export class List {
  
  constructor(
    private registerService: RegisterService) { 
      
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
        
      } catch (err) {
        console.error('Error deleting record:', err);
      }
    }
    
  }
  