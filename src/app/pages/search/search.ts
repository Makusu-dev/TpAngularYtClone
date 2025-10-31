import { Component, inject, signal } from '@angular/core';
import { NAPOD } from '../../services/napod';
import { NasaApi } from '../../interfaces/nasa-api';
import { FormsModule, NgModel } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  imports: [FormsModule],
  templateUrl: './search.html',
  styleUrl: './search.css'
})
export class Search {
  private readonly nasaApi = inject(NAPOD);
  private readonly router = inject(Router)
  searchResults = signal<NasaApi | null>(null)
  searchString=signal('');

  onSubmit() {
    this.nasaApi.searchForVideos(this.searchString()).subscribe({
      next: (data)=>{this.searchResults.set(data);
        console.log(data.collection);
      },
      error: error =>{console.log(error);
      }
    })   
  }

  onClick(nasaId: string){
    this.router.navigate(['/video/'+nasaId])
  }

  updateSearch(event: Event){
    console.log(this.searchString());
    const target = event.target as HTMLInputElement;
    this.searchString.set(target.value)
  }


}
