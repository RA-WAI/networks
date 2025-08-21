import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RegisterService } from '../../services/register-service';
import { Observable } from 'rxjs';
import { Register } from '../../interfaces/register';

@Component({
  selector: 'app-list',
  imports: [RouterModule],
  templateUrl: './list.html',
  styleUrl: './list.css'
})
export class List {
  
  constructor(private registerService: RegisterService,) {
    
  }
  
  records: Register[] = [];
  
  ngOnInit(): void {
    this.loadRecords();
  }
  
  loadRecords() {
    this.registerService.getRecords().subscribe({
      next: (data) => {
        this.records = [...data];
        this.records.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        console.log('Fetched records:', this.records);
      },
      error: (err) => console.error('Error fetching records:', err),
      complete: () => console.log('Records fetched successfully'),
    });
  }
  
}
